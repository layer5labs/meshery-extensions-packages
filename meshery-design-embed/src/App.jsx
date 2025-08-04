import { useState } from "react";
import MesheryDesignEmbed from "../lib/main";

function App() {
  const [count, setCount] = useState(0);

  // Meshery Embed Note:
  // By default, this embed points to https://meshery.layer5.io.
  // To change the destination, modify the host or designId below.

  const host = "https://meshery.layer5.io";
  const designId = "embedded-design-a3d3f26e-4366-44e6-b211-1ba4e1a3e644";

  // if designId exists, append it to the URL
  const link = designId
    ? `${host}/designer?designId=${designId}`
    : host;

  return (
    <>
      <h3> Test Rerenders </h3>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p>

      <h3>Meshery Embed</h3>
      <div>
        <MesheryDesignEmbed
          embedScriptSrc="embedded-design-embed1.js"
          embedId={designId}
        />
      </div>
      
      <div style={{ marginTop: "1rem" }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button>Open in Meshery</button>
        </a>
      </div>  
    </>
  );
}


export default App;
