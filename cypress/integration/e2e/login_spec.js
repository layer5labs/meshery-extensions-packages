/// <reference types="cypress" /> // Add and extra '/' to load the cypress auto-complete feature following npm i cypress
import {DESIGNER, VISUALIZER} from "../../support/constants"
describe("Login", () => {
  beforeEach(() => {
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    window.localStorage.setItem("tab", 0);
    cy.intercept("/api/provider/extension*").as("extensionFileLoad")
  })

  it("Visit MeshMap Designer", () => {
    cy.setMode(DESIGNER)
    cy.visit("/extension/meshmap")
    cy.wait("@getCapabilites")
    cy.wait("@extensionFileLoad")
    cy.wait(1000)
    cy.contains("MeshMap")
    cy.contains("Components")
    cy.contains("Designs")
    cy.contains("Applications")
    cy.contains("Filters")
  });
})
