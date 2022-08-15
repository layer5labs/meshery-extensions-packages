import {DESIGNER} from "../../support/constants"
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

  it("Visit MeshMap Application", () => {
    cy.get('[data-cy="application-drawer"]').click();
    cy.contains("Applications")
    cy.get("#MUIDataTableBodyRow-applications-0").should("be.visible").click(); //convention: MUIDataTableBodyRow + type  + rowIndex
    cy.wait(2000);
    cy.get("body").then(body => {
        if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
          cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
        }
      })
  });

  it("Rename and Saving Application", () => {
    cy.get("#component-drawer-Application").should('be.visible')
    cy.get("#design-name-textfield").type("Changed Application Name with cypress");
    cy.intercept('/api/application').as('applicationSave')
 
    // TODO - Saving Application request intercept need to be fixed.

    // cy.wait("@applicationSave").then(() => {
    //     // move to drawer and check for update
    //     cy.get("[data-cy='design-drawer']").click();
    //     cy.wait(5000); // wait for seconds, because the subscritions cannot be tracked for now
    //     cy.get("#MUIDataTableBodyRow-applications-0 p").contains("Changed Application Name with cypress");
    //   })
  })

  it("Search an Application", () => {
    cy.get("[data-cy='application-drawer']").click();
    cy.get('[data-test-id="Search"]').type("Changed Application Name with cypress");
    cy.intercept("/api/application*").as("applicationDelete")
    cy.wait(3000)
    // TODO - Application was not saved so not able to Search
    // cy.get("#MUIDataTableBodyRow-applications-0").should("be.visible").contains("Changed Application Name with cypress");
  })

})
