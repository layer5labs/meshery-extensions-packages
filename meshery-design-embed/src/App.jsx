import { useState } from "react";
import MesheryDesignEmbed from "../lib/main";

function App() {
  const [count, setCount] = useState(0);

  // Meshery Embed Note:
  // By default, this embed points to https://meshery.layer5.io.
  // To change the destination, modify the host or designId below.

  const customDesignLink = "https://cloud.layer5.io/catalog/content/design/embedded-design-a95b76ce-ceaf-4bdf-bac7-95a6773168cd";

  return (
    <>
      <h3> Test Rerenders </h3>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <p>{count}</p>

      <h3>Meshery Embed - Default Design (No Props)</h3>
      <MesheryDesignEmbed />

      <h3>Meshery Embed - Custom Design</h3>
      <MesheryDesignEmbed
        embedScriptSrc="embedded-design-embed1.js"
        designLink={customDesignLink}
      />
    </>
  );
}

export default App;