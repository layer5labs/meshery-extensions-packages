// <reference types="cypress" /> // Add and extra '/' to load the cypress auto-complete feature following npm i cypress

function altercapabilityFixture(version) { 
  cy.readFile("cypress/fixtures/capabilities.json", (err, data) => {
    if (err) {
        return console.error(err);
    };
  }).then((data) => {
    data["package_version"] = version;
    data["package_url"] = `https://github.com/layer5labs/meshery-extensions-packages/releases/download/${version}/provider-meshery.tar.gz`
    cy.writeFile("cypress/fixtures/capabilities.json", JSON.stringify(data))
  })
}

// The Extension Modes
const MODES = {
  DESIGNER: "designer",
  VISUALISER: "visualiser"
}

function setMode(mode) {
  window.localStorage.setItem("mode", mode)
}

describe("Login", () => {
  beforeEach(()=>{
    const token = Cypress.env('token')
    const releasetag = Cypress.env("releasetag")
    cy.setCookie("meshery-provider", "Meshery")
    cy.setCookie("token", token)
    window.localStorage.setItem("tab", 0)
    altercapabilityFixture(releasetag)
  })

  beforeEach(()=>{
    cy.intercept('GET', '/api/provider/capabilities', {fixture: 'capabilities.json'}).as('getCapabilites')
  })

  it("Visit MeshMap Designer", () => {
    setMode(MODES.DESIGNER);
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

  // visualiser test is skipped until the gql-plugin error sorts out in meshery
  it.skip("Visit MeshMap Visualiser", () => {
    setMode(MODES.VISUALISER)
    cy.visit("/extension/meshmap")
    cy.wait("@getCapabilites")
    cy.wait(15000)
    cy.contains("MeshMap")
    cy.contains("View Selector")
    //tabs
    cy.contains("Details")
    cy.contains("Metrics")
    cy.contains("Actions")
  });
})
