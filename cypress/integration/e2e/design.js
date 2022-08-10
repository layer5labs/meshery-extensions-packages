import { DESIGNER } from "../../support/constants"
import '@4tw/cypress-drag-drop'

describe("Designer Spec", () => {
  beforeEach(() => {
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    window.localStorage.setItem("tab", 0) // its a bug in designer
    cy.setMode(DESIGNER)
    cy.visit("/extension/meshmap");
    cy.intercept("/api/provider/extension").as("extensionFileLoad")
    cy.wait("@extensionFileLoad");
  })

  it("Load MeshMap Design with a click", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get("#MUIDataTableBodyRow-patterns-0").click(); //convention: MUIDataTableBodyRow + type  + rowIndex
    cy.get("[data-cy='progress-snackbar'] span").contains("Rendering your MeshMap...");
    cy.wait(2000);
    cy.get("body").then(body => {
      if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
        cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
      }
    })
  });

  it("Drag All Visible component on canvas", () => {
    cy.get(".component-drawer-svg-container").each(ele => {
      cy.get(ele).should('be.visible').drag("#cy-canvas-container")
      cy.wait(1000)
    })
  });

})
