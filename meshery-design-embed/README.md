# Meshery design embed

Meshery Design Embedding allows you to export a design in a format that can be integrated into websites, blogs, or platforms supporting HTML, CSS, and JavaScript. This embedded version offers an interactive representation of the design, simplifying sharing with infrastructure stakeholders.

## meshery-design-embed react component

this component is meant to facilate the usage of meshery embeddings inside react and its frameworks

usage :

```
import MesheryDesignEmbed from '@layer5/meshery-design-embed'


function Design() {
  return (
    <>

      <div>
        <MesheryDesignEmbed
          embedScriptSrc="embedded-design-embed1.js"  // path to the embed script
          embedId="embedded-design-a3d3f26e-4366-44e6-b211-1ba4e1a3e644" // id of the embedding
        />
      </div>
    </>
  );
}

```

Learn more about meshery design embeddings [here](https://docs.layer5.io/meshmap/designer/export-designs/#exporting-as-embedding)
