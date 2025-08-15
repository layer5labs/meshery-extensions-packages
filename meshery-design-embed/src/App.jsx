import { useState } from "react";
import MesheryDesignEmbed from "../lib/main";

function App() {
  const [count, setCount] = useState(0);

  // Meshery Embed Note:
  // By default, this embed points to https://meshery.layer5.io.
  // To change the destination, modify the designLink below.

  const designLink = "https://cloud.layer5.io/catalog/content/design/embedded-design-a95b76ce-ceaf-4bdf-bac7-95a6773168cd";

  return (
    <>
      <h3> Test Rerenders </h3>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p>

      <h3>Meshery Embed - Open Mode (Open Original)</h3>
      <MesheryDesignEmbed
        embedScriptSrc="embedded-design-embed1.js"
        designLink={designLink}
        mode="open"
      />

      <h3>Meshery Embed - Clone Mode (Create Independent Copy)</h3>
      <MesheryDesignEmbed
        embedScriptSrc="embedded-design-embed1.js"
        designLink={designLink}
        mode="clone"
      />
    </>
  );
}

export default App;