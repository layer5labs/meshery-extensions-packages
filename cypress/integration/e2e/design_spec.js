import { DESIGNER } from "../../support/constants"
import '@4tw/cypress-drag-drop'

describe("Designer Spec", () => {
  beforeEach(() => {
    cy.viewport(1500, 900) 
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    window.localStorage.setItem("tab", 0) // its a bug in designer
    cy.setMode(DESIGNER)
    cy.visit("/extension/meshmap");
    cy.intercept("/api/provider/extension*").as("extensionFileLoad")
    cy.wait("@extensionFileLoad", { timeout: 20000 });
  })

  const argoRolloutDesign = "no-modify-argo-rollout-application-for-cypress";

  it("Load MeshMap Design with a click", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get("#MUIDataTableBodyRow-patterns-0", {timeout: 30000});
    cy.wait(2000);
    cy.intercept("/api/pattern*").as("patternLoad")
    cy.get("#MUIDataTableBodyRow-patterns-0").click(); //convention: MUIDataTableBodyRow + type  + rowIndex
    cy.wait("@patternLoad");
    // cy.get("[data-cy='progress-snackbar']").contains("Rendering your MeshMap...");
    cy.wait(2000);
    cy.get("body").then(body => {
      if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
        cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
      }
    })
  });

  it("Rename Design", () => {
    cy.get("#component-drawer-Application").should('be.visible').drag("#cy-canvas-container");
    cy.get("[data-cy='design-drawer']").click(); // to close the rjsf form by click event
    cy.get("#design-name-textfield").type("Changed Name with cypress");
    cy.intercept('/api/pattern').as('patternSave')
    cy.wait("@patternSave").then(() => {
      // move to drawer and check for update
      cy.get("[data-cy='design-drawer']").click();
      cy.get("#MUIDataTableBodyRow-patterns-0 p", {timeout: 30000}).contains("Changed Name with cypress");
    })
  })

  it("Search a design", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get("#MUIDataTableBodyRow-patterns-0", {timeout: 30000})
    cy.wait(2000);
    cy.get("#MUIDataTableBodyRow-patterns-0").click();
    cy.get('[data-test-id="Search"]').type("Changed Name with cypress");
    cy.intercept("/api/pattern*").as("patternSearch")
    cy.wait("@patternSearch")
    cy.get("#MUIDataTableBodyRow-patterns-0").should("be.visible").contains("Changed Name with cypress");
  })

  it("Deploy a design", () => {
    cy.get("[data-cy='design-drawer']").click();
    cy.get("#MUIDataTableBodyRow-patterns-0", {timeout: 30000})
    cy.wait(2000);
    cy.get("#MUIDataTableBodyRow-patterns-0").click();
    cy.get('[data-test-id="Search"]').type(argoRolloutDesign);
    cy.intercept("/api/pattern*").as("patternPost")
    cy.wait("@patternPost")
    cy.get("#MUIDataTableBodyRow-patterns-0").should("be.visible").contains(argoRolloutDesign);
    cy.wait(2000);
    cy.get("#MUIDataTableBodyRow-patterns-0").click();
    cy.wait("@patternPost");
    cy.wait(2000);

    // rendering done up until this point
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
          cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Failed")
        }
      })
    })
  });
})
