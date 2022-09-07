import { DESIGNER } from "../../support/constants"
// import '@4tw/cypress-drag-drop' // Filters drag and drop on canvas is disabled for now.

describe("Filter Spec", () => {
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

      const filterName = "Basic Auth for Istio" // sample name of an application

      it("Render Filters", () => {
        cy.get("[data-cy='filter-drawer']").click();
        cy.get("#MUIDataTableBodyRow-filters-0").should("be.visible").click(); //convention: MUIDataTableBodyRow + type  + rowIndex
        // cy.get("[data-cy='progress-snackbar']").contains("Rendering your MeshMap...");
        cy.wait(2000);
        cy.get("body").then(body => {
          if (body.find("[aria-describedby='notistack-snackbar'] #notistack-snackbar").length > 0) {
            cy.get("[aria-describedby='notistack-snackbar'] #notistack-snackbar").should("not.contain", "Unable to render")
          }
        })
      });

      it("Rename Filter", () => {
        cy.get("#component-drawer-Application").should('be.visible') // .drag("#cy-canvas-container") Filters drag and drop on canvas is disabled for now.
        cy.get("#design-name-textfield").type(filterName);
        cy.intercept('/api/filter').as('filterSave')
        cy.wait("@filterSave").then(() => {
          // move to drawer and check for update
          cy.get("[data-cy='filter-drawer']").click();
          cy.wait(5000); // wait for seconds, because the subscritions cannot be tracked for now
          cy.get("#MUIDataTableBodyRow-filters-0 p").contains(filterName);
        })
      })

      it("Search a filter", () => {
        cy.get("[data-cy='filter-drawer']").click();
        cy.get('[data-test-id="Search"]').type(filterName);
        cy.intercept("/api/filter*").as("filterSearch")
        cy.wait("@filterSearch")
        cy.get("#MUIDataTableBodyRow-filters-0").should("be.visible").contains(filterName);
      });

})