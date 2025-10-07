import { useState } from "react";
import MesheryDesignEmbed from "../lib/main";

function App() {
  const [count, setCount] = useState(0);

  

  const embeddedId = "embedded-design-a3d3f26e-4366-44e6-b211-1ba4e1a3e644";

  return (
    <>
      <h3> Test Rerenders </h3>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p>

      <h3>Meshery Embed</h3>
      <MesheryDesignEmbed
          embedScriptSrc="embedded-design-embed1.js"
          embedId={embeddedId}
      />
    </>
  );
}


export default App;