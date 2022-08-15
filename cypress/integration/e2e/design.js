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
    cy.intercept("/api/provider/extension*").as("extensionFileLoad")
    cy.wait("@extensionFileLoad", { timeout: 20000 });
  })

  it("Load MeshMap Design with a click", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get("#MUIDataTableBodyRow-patterns-0").should("be.visible").click(); //convention: MUIDataTableBodyRow + type  + rowIndex
    // cy.get("[data-cy='progress-snackbar']").contains("Rendering your MeshMap...");
    cy.wait(2000);
    cy.get("body").then(body => {
      if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
        cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
      }
    })
  });

  it("Rename Design", () => {
    cy.get("#component-drawer-Application").should('be.visible').drag("#cy-canvas-container")
    cy.get("#design-name-textfield").type("Changed Name with cypress");
    cy.intercept('/api/pattern').as('patternSave')
    cy.wait("@patternSave").then(() => {
      // move to drawer and check for update
      cy.get("[data-cy='design-drawer']").click();
      cy.wait(5000); // wait for seconds, because the subscritions cannot be tracked for now
      cy.get("#MUIDataTableBodyRow-patterns-0 p").contains("Changed Name with cypress");
    })
  })

  it("Search a design", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get('[data-test-id="Search"]').type("Changed Name with cypress");
    cy.intercept("/api/pattern*").as("patternDelete")
    cy.wait(3000)
    cy.get("#MUIDataTableBodyRow-patterns-0").should("be.visible").contains("Changed Name with cypress");
  })

  it("Deploy a design", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get('[data-test-id="Search"]').type("Changed Name with cypress");
    cy.intercept("/api/pattern*").as("patternDelete")
    cy.wait(3000)
    cy.get("#MUIDataTableBodyRow-patterns-0").should("be.visible").contains("Changed Name with cypress").click();
    cy.wait(3000);
    cy.get("body").then(body => {
      if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
        cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
      }
    })
    cy.get("#deploy-design-btn").click();
    // modal opens
    cy.intercept("/api/pattern/deploy*").as("patternDeploy")
    cy.get('[data-cy="deploy-btn-confirm"]').click();
    cy.wait("@patternDeploy").then(() => {
      // cy.get("[data-cy='progress-snackbar']").contains("Deploying design");
      cy.get("body").then(body => {
        if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
          cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Error")
        }
      })
    })
  });

  it("Drag All Visible component on canvas", () => {
    cy.get(".component-drawer-svg-container").each(ele => {
       const elem = cy.get(ele);
       elem.click();
       elem.drag("#cy-canvas-container")
       cy.wait(500)
    })
  });
})
