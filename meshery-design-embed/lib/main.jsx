/* eslint react/prop-types: 0 */
import { useEffect, useState } from "react";

const useScript = (url, embedId) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    const script = document.createElement("script");

    script.src = url;
    script.async = true;
    // script is a module (this is required for module to work)
    script.type = "module";

    document.body.appendChild(script);

    script.onload = () => {
      // emit DomcontentLoaded event
      // this is required for the module to work
      // as it is dependent on the DOM
      document.dispatchEvent(new Event("DOMContentLoaded"));
      setLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [url, loaded, embedId]);
};

const MesheryDesignEmbed = ({
  embedScriptSrc,
  designLink,
  style = {},
}) => {
  useScript(embedScriptSrc, designLink);

  return (
    <div style={{ width: "100%", height: "30rem", ...style }}>
      {/* Embed script injection (iframe or script tag logic here) */}
      <div id={designLink}></div>

      {/* Show button only if designLink exists */}
      {designLink && (
        <div style={{ marginTop: "1rem" }}>
          <a href={designLink} target="_blank" rel="noopener noreferrer">
            <button>Open in Meshery</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default MesheryDesignEmbed;
