import {DESIGNER} from "../../support/constants"
import '@4tw/cypress-drag-drop'
describe("Application Spec", () => {
  beforeEach(() => {
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    window.localStorage.setItem("tab", 0)
    cy.setMode(DESIGNER)
    cy.visit("/extension/meshmap");
    cy.intercept("/api/provider/extension*").as("extensionFileLoad");
    cy.wait("@extensionFileLoad", { timeout: 20000 });
  })

  const applicationName = "emoji.yaml" // sample name of an application

  it("Render MeshMap Application", () => {
    cy.get('[data-cy="application-drawer"]').click();
    cy.contains("Applications")
    cy.get("#MUIDataTableBodyRow-applications-0").should("be.visible").click(); //convention: MUIDataTableBodyRow + type  + rowIndex
    cy.wait(2000);
    cy.get("body").then(body => {
        if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
          cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Error")
        }
      })
  });

  it("Rename and Saving Application", () => {
    cy.get("#component-drawer-Application").should('be.visible').drag("#cy-canvas-container")
    cy.get("#design-name-textfield").type(applicationName);
    cy.intercept('/api/application*').as('applicationSave')
 
    // TODO - Saving Application request intercept need to be fixed.

    cy.wait("@applicationSave").then(() => {
        // move to drawer and check for update
        cy.get("[data-cy='design-drawer']").click();
        cy.wait(5000); // wait for seconds, because the subscritions cannot be tracked for now
        cy.get("#MUIDataTableBodyRow-applications-0 p").contains(applicationName);
      })
  })

  it("Search an Application", () => {
    cy.get("[data-cy='application-drawer']").click();
    cy.get('[data-test-id="Search"]').type(applicationName);
    cy.intercept("/api/application*").as("applicationSearch")
    cy.wait("@applicationSearch")
    cy.get("#MUIDataTableBodyRow-applications-0").should("be.visible").contains(applicationName);
  })

  it("Deploy an Application", () => {
    cy.get("[data-cy='application-drawer']").click();
    cy.get('[data-test-id="Search"]').type(applicationName);
    cy.intercept("/api/application*").as("patternPost")
    cy.wait("@patternPost")
    cy.get("#MUIDataTableBodyRow-applications-0").should("be.visible").contains(applicationName).click();
    cy.wait(2000);
    cy.get("body").then(body => {
      if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
        cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
      }
    })
    cy.get("#deploy-design-btn").click();
    // modal opens
    cy.intercept("/api/pattern/deploy*").as("applicationDeploy")
    cy.get('[data-cy="deploy-btn-confirm"]').click();
    cy.wait("@applicationDeploy").then(() => {
      // cy.get("[data-cy='progress-snackbar']").contains("Deploying design");
      cy.get("body").then(body => {
        if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
          cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Error")
        }
      })
    })
  });

  it("Drag All Visible component on canvas", () => {
    cy.get(".component-drawer-svg-container[draggable='true']").each(ele => {
      const elem = cy.get(ele);
      elem.click();
      elem.drag("#cy-canvas-container")
      cy.wait(500)
    })
  });

})