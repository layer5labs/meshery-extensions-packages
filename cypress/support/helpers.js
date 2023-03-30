import { DESIGNER, extension, MESHMAP_PATH } from "../support/constants"


export function waitFor(str) {
  return "@" + str;
}

export function id(str) {
  return "#" + str
}

const doInitialSetup = () => {
  cy.setViewPort();
  cy.login();
  cy.setReleaseTag();
  cy.interceptCapabilities();
  cy.setMode(DESIGNER);
}

export const beforeEachCallback = () => {
  doInitialSetup();
  cy.intercept(extension.path).as(extension.alias);
  cy.visit(MESHMAP_PATH)
  cy.wait(waitFor(extension.alias), { timeout: 15000 });
}

export const beforeEachCallbackForCustomUrl = (customPath) => {
  doInitialSetup();
  cy.intercept(extension.path).as(extension.alias);
  cy.visit(customPath);
  cy.wait(waitFor(extension.alias), { timeout: 15000 });
}
