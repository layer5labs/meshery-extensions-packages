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

  it("Drag All Visible component on canvas", () => {
    cy.get(".component-drawer-svg-container[draggable='true']").each(ele => {
      const elem = cy.get(ele);
      elem.click();
      elem.drag("#cy-canvas-container")
      cy.wait(500)
      cy.get("#component-delete").click();
    })
  });
})
