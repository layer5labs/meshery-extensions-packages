# Meshery Design Embed Package

Meshery Design Embedding allows you to export a design in a format that can be integrated into websites, blogs, or platforms supporting HTML, CSS, and JavaScript. This embedded version offers an interactive representation of the design, simplifying sharing with infrastructure stakeholders.
  
## meshery-design-embed react component

This component is meant to facilate the usage of meshery embeddings inside react and its frameworks

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
 - embedId: "Emebedded design id"
 - style: "Custom styles to the embeded design E.g. backgroundColor, textColor, etc"

Learn more about [embedding Meshery Designs](https://docs.layer5.io/meshmap/designer/export-designs/#exporting-as-embedding).
