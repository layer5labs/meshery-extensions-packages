import { DESIGNER } from "../../support/constants"
describe("Designer Spec", () => {
  beforeEach(() => {
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    window.localStorage.setItem("tab", 0) // its a bug in designer
    cy.setMode(DESIGNER)
    cy.visit("/extension/meshmap");
  })

  it("Load MeshMap Design with a click", () => {
    cy.wait(3000);
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
})
