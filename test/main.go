package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/smtp"
	"net/url"
	"sync"
	"time"

	"github.com/gobuffalo/pop"
	ory "github.com/ory/client-go"
	"github.com/sirupsen/logrus"
)

const retries = 3
const EMAIL_SENT = 2
const HealthResponse = "ok"
const HEALTH = "health/ready"

var kratosDbUrl, monitorAccount, alertAccount, smtpHost, smtpPort, smtpUsername, smtpPassword, kratosPublicUrl, hydraPublicUrl string
var recipient = []string{
	alertAccount,
}
var kratosCxn *pop.Connection

type CourierMessage struct {
	State     int    `json:"status" db:"status"`
	Recipient string `json:"recipient" db:"recipient"`
}

type Health struct {
	Status string `json:"status"`
}

func InitKratosClient() *ory.APIClient {
	kratosConfig := ory.NewConfiguration()
	kratosConfig.Servers = []ory.ServerConfiguration{
		{
			URL: kratosPublicUrl,
		},
	}

	kratosApiClient := ory.NewAPIClient(kratosConfig)
	return kratosApiClient
}

func HealthCheck(hostURL, hostName string, wg *sync.WaitGroup) bool {
	resp, err := http.Get(hostURL)
	result := &Health{}
	if err == nil {
		defer resp.Body.Close()

		bd, _ := io.ReadAll(resp.Body)
		_ = json.Unmarshal(bd, &result)
		if (string(result.Status) != HealthResponse) {
			message := fmt.Sprintf("Subject: %s Health Status\n\n" + "This is an alert email. The %s Container is not healthy/down." + time.Now().UTC().Format("Mon 02-01-06 15:04:05 UTC"), hostName)
			issueAlert(message)
			wg.Done()
			return false
		}
	}
	wg.Done()
	return true
}
func KratosTest(hostURL, hostName string, wg *sync.WaitGroup) []ory.Message {
	if (HealthCheck(hostURL, hostName, wg)) {
		kratosApiClient := InitKratosClient()
		ctx := context.Background()
		
		flow, _, err := kratosApiClient.FrontendApi.CreateNativeVerificationFlow(ctx).Execute()
		if err == nil {
			kratosApiClient.FrontendApi.UpdateVerificationFlow(ctx).Flow(flow.Id).
			UpdateVerificationFlowBody(ory.UpdateVerificationFlowWithLinkMethodAsUpdateVerificationFlowBody(&ory.UpdateVerificationFlowWithLinkMethod{
				Email:  monitorAccount,
				Method: "link",
			})).Execute()
				
			for i := 0; i < retries; i++ {
				status := GetEmailStatus(monitorAccount)
				if status == EMAIL_SENT {
					break
				}
				if status != 2 && i == retries-1 {
					message := "Subject: Kratos Courier Service down\n\n" + "This is an alert email. The Kratos Courier Service is down from " + time.Now().UTC().Format("Mon 02-01-06 15:04:05 UTC")
					issueAlert(message)
					logrus.Info("courier service is down")
					break
				}
				time.Sleep(1 * time.Minute)
			}
		}		
	} else {
		message := fmt.Sprintf("Subject: %s Health Status\n\n" + "This is an alert email. The %s Container is not healthy/down." + time.Now().UTC().Format("Mon 02-01-06 15:04:05 UTC"), hostName)
		issueAlert(message)
	}

	wg.Done()
	return nil
}

func issueAlert(message string) {
	from := "no-reply@layer5.io"
	smtpHost := smtpHost
	smtpPort := smtpPort

	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, recipient, []byte(message))
	if err != nil {
		logrus.Error("an error occured while issuing an alert: %v", err)
		return
	}
}

func GetEmailStatus(recipient string) int {
	emailStatus := CourierMessage{}
	qc := kratosCxn.Q().Select("recipient, status").Where("recipient = ?", recipient)

	err := qc.Last(&emailStatus)

	if err != nil {
		logrus.Errorf("error retrieving email status: %v", err)
		return -1
	}
	return emailStatus.State
}

var wg sync.WaitGroup

func main() {
	var err error
	kratosCxn, err = pop.NewConnection(&pop.ConnectionDetails{
		Dialect: "postgres",
		URL:     kratosDbUrl ,
	})
	if err != nil {
		logrus.Fatal("unable to connect to the database: %v", err)
	}
	err = kratosCxn.Open()
	if err != nil {
		logrus.Fatalf("unable to open connection: %v", err)
	}
	kratosHealthEp, _ := url.Parse(fmt.Sprintf("%s/%s", kratosPublicUrl, HEALTH))
	hydraHealthEp, _ := url.Parse(fmt.Sprintf("%s/%s", hydraPublicUrl, HEALTH))
	wg.Add(3)
	go HealthCheck(hydraHealthEp.String(), "Hydra", &wg)
	go KratosTest(kratosHealthEp.String(), "Kratos", &wg)
	wg.Wait()
}