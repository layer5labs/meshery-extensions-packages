/// <reference types="cypress" /> // Add and extra '/' to load the cypress auto-complete feature following npm i cypress
import {DESIGNER, VISUALIZER} from "../../support/constants"
describe("Login", () => {
  beforeEach(() => {
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    window.localStorage.setItem("tab", 0)
  })

  it("Visit MeshMap Designer", () => {
    cy.setMode(DESIGNER)
    cy.visit("/")
    cy.wait("@getCapabilites")
    cy.get('[data-cy="MeshMap"]').click();
    cy.wait(3000)
    cy.contains("MeshMap")
    cy.contains("Components")
    cy.contains("Designs")
    cy.contains("Applications")
    cy.contains("Filters")
  });

  // visualizer test is skipped until the gql-plugin error sorts out in Meshery
  it("Visit MeshMap Visualizer", () => {
    cy.setMode(VISUALIZER)
    cy.visit("/extension/meshmap")
    cy.wait("@getCapabilites")
    cy.intercept("/api/provider/extension*").as("extensionFileLoad")
    cy.wait("@extensionFileLoad", { timeout: 20000 });
    cy.wait(1000);
    cy.get("body").then(body => {
      if (body.find('[data-cy="modal-close-btn"]').length > 0) {
        cy.get('[data-cy="modal-close-btn"]').click();
      }
    })
    cy.contains("MeshMap")
    cy.contains("View Selector")
    //tabs
    cy.contains("Details")
    cy.contains("Metrics")
    cy.contains("Actions")
  });
})
