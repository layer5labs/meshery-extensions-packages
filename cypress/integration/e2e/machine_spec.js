import { DESIGNER } from "../../support/constants"
import '@4tw/cypress-drag-drop'

describe("State Machine Spec", () => {
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

    context("State Machine Test", () => {
        it("DO NOT allow merge of a design into itself", () => {
            cy.get('[data-cy="design-drawer"]').click();
            cy.get("#MUIDataTableBodyRow-patterns-0", { timeout: 30000 }).should("be.visible"); 

            // First design dropped on canvas
            cy.get("#MUIDataTableBodyRow-patterns-0").click();
            
            // Drop same design on canvas to test (do not merge) 
            cy.get("#MUIDataTableBodyRow-patterns-0").drag("#cy-canvas-container", { force: true });
            cy.wait(2000);
            cy.get("body").then(body => {
                if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
                    cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("contain", "Cannot merge a design into itself.")
                }
            })
        });

        it('DO save design every time a node is added or removed', () => {
        // Save on Additon of node  
            // A node is added on canvas    
            cy.get("#component-drawer-Application").should('be.visible').drag("#cy-canvas-container", {force: true});
            // Go to that design
            cy.get("[data-cy='design-drawer']").click();
            cy.get("#MUIDataTableBodyRow-patterns-0").click();
            // Save the design
            cy.intercept('/api/pattern').as('patternSave')
            cy.wait("@patternSave");
        // Save on deletion of node
            cy.get('[data-cy="component-drawer"]').click()
            cy.get("#component-drawer-Application").should('be.visible').drag("#cy-canvas-container", {force: true});
            // Perform delete action
            cy.get("#component-delete").click();
            // Save the design
            cy.intercept('/api/pattern').as('patternSave')
            cy.wait("@patternSave");
          })
    })

});
