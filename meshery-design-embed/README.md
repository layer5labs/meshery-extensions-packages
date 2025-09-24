# Meshery Design Embed Package

Meshery Design Embedding allows you to export a design in a format that can be integrated into websites, blogs, or platforms supporting HTML, CSS, and JavaScript. This embedded version offers an interactive representation of the design, simplifying sharing with infrastructure stakeholders.

## Local Development 

Follow the steps below to setup the local development server and run it locally.

### Install dependencies:

This would install all the packages required.

``` 
npm i
```
### Start the development server:

```
npm run dev
```

Open your browser and navigate to http://localhost:5173 

A test design will be automatically rendered, allowing you to see your changes in real-time and test different configurations. The development server supports hot reload, so changes will update automatically.
  
## meshery-design-embed react component

This component is meant to facilitate the usage of meshery embeddings inside react and its frameworks

Usage :
```
import MesheryDesignEmbed from '@layer5/meshery-design-embed'


function Design() {
  return (
    <>

      <div>
        <MesheryDesignEmbed
          embedScriptSrc="embedded-design-embed1.js"
          embedId="embedded-design-a3d3f26e-4366-44e6-b211-1ba4e1a3e644"
        />
      </div>
    </>
  );
}

```

Props:
 - embedScriptSrc: "Relative path to the exported design"
 - designLink: "Full URL to the embedded design (if provided, shows 'Open in Meshery' button)"
 - style: "Custom styles to the embedded design E.g. backgroundColor, textColor, etc"

### Limitations

Certain aspects of Meshery Designs and their visualization are not currently supported in embed mode (when a design is embedded into a webpage).

1. Relationship: Singular Node inventory wallet (badge)
1. Relationship: TagSets (BubbleSets)
1. Component: Textboxes
1. Function: Error badges based on validation checks
1. Function: Component Locking (pinning a component in-place moving with edges; Automove)
1. Function: Viewing component configuration
1. Function: Viewing comments 

Learn more about [embedding Meshery Designs](https://docs.layer5.io/meshmap/designer/embedding-designs/).
