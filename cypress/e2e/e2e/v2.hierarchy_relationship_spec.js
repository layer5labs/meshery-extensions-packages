// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// <reference types="../../support" /> 

import { designEndpoint, hierarchyRelationshipDesign, TIME } from "../../support/constants";
import { beforeEachCallbackForCustomUrl } from "../../support/helpers";

describe("Hierarchy relationship Test", () => {
  beforeEach(() => {
    beforeEachCallbackForCustomUrl(hierarchyRelationshipDesign.url);
    cy.disableCollaboration(); // disable-collaboration for async modification while design is being tested
  });

  it("[RJSF] should change the namespace value to its parent label when dragged inside it", () => {
    cy.wait(TIME.XLARGE);
    cy.window().then(window => {
      const cyto = window.cyto;
      const nsNode = cyto.nodes('[type="Namespace"]')[0]
      const podNode = cyto.nodes('[type="Pod"]')[0]

      podNode.move({
        parent: nsNode.data("id")
      })
      setTimeout(()=> {
        podNode.emit("tap")
      }, TIME.SMALL)
      cy.wait(TIME.XXLARGE)
      cy.get("#root_namespace").invoke("val").should("contain", nsNode.data("label"))
    })
  })

  it("[RJSF] should change the namespace value to 'default' when dragged out from that Namespace Node", () => {
    cy.wait(TIME.XLARGE)
    cy.window().then(window => {
      const cyto = window.cyto;
      // const nsNode = cyto.nodes('[type="Namespace"]')[0]
      const podNode = cyto.nodes('[type="Pod"]')[0]

      // move pod out of the namespace
      podNode.move({
        parent: null
      })

      setTimeout(()=> {
        podNode.emit("tap")
      }, TIME.SMALL)
      cy.wait(TIME.XXLARGE)
      cy.get("#root_namespace").invoke("val").should("contain", "default") // "default" is the default namespace value

    })
  })

  it("[cytoscape/request] should change the namespace value to label of its parent when dragged inside it, should verified with the request body change", () => {
    cy.wait(TIME.XLARGE);
    cy.window().then(window => {
      const cyto = window.cyto;
      const nsNode = cyto.nodes('[type="Namespace"]')[0]
      const podNode = cyto.nodes('[type="Pod"]')[0]

      podNode.move({
        parent: nsNode.data("id"),
      });
      cy.intercept(designEndpoint.path).as(designEndpoint.alias);

      nsNode.emit("tap");
      cy.wait(designEndpoint.wait, { timeout: TIME.XXLARGE }).then(interceptionObj => {
        // console.log("result of endpoint", interceptionObj)
        const reqBody = interceptionObj.request.body;
        expect(reqBody).to.have.ownProperty("cytoscape_json")
        const cyJson = JSON.parse(reqBody.cytoscape_json);

        const podValue = cyJson.elements.find(element => element.scratch._data.type === "Pod")
        expect(podValue.scratch._data.namespace).to.equal(nsNode.data("label"))
      })
    })
  })

  it("[cytoscape/request] should change the namespace value to 'default' when dragged out from Namespace, should verified with the request body change", () => {
    cy.wait(TIME.XLARGE);
    cy.window().then(window => {
      const cyto = window.cyto;
      const nsNode = cyto.nodes('[type="Namespace"]')[0]
      const podNode = cyto.nodes('[type="Pod"]')[0]

      podNode.move({
        parent: null
      })
      cy.intercept(designEndpoint.path).as(designEndpoint.alias)
      nsNode.emit("tap")
      cy.wait(designEndpoint.wait, { timeout: TIME.XXLARGE }).then(interceptionObj => {
        console.log("result of endpoint", interceptionObj)
        const reqBody = interceptionObj.request.body;
        expect(reqBody).to.have.ownProperty("cytoscape_json")
        const cyJson = JSON.parse(reqBody.cytoscape_json);

        const podValue = cyJson.elements.find(element => element.scratch._data.type === "Pod")
        expect(podValue.scratch._data.namespace).to.equal("default")
      })
    })
  })
})