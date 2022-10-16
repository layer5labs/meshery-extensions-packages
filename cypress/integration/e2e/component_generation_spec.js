import { DESIGNER } from "../../support/constants"

describe("Component Generation Spec", () => {
  beforeEach(() => {
    cy.login();
    cy.setReleaseTag();
    cy.interceptCapabilities();
    cy.setMode(DESIGNER)
    cy.visit("/extension/meshmap");
    cy.intercept("/api/provider/extension*").as("extensionFileLoad")
    cy.wait("@extensionFileLoad", { timeout: 20000 });
  })

  it("Check if all K8s components are generatedor not", () => { 
    cy.get('[data-cy="component-drawer"]').click();
    cy.get('[data-cy="component-search"]').clear().type("Service Account");
  });
})
