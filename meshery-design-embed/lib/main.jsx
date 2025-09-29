/* eslint react/prop-types: 0 */
import { useEffect, useState } from "react";
import LogoIcon from "../src/assets/meshery-logo.svg";

const useScript = (url, embedId) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    // script is a module (this is required for module to work
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

const CustomMesheryToolbar = ({ embedId }) => {
  const extractUUID = (str) => {
    const prefix = "embedded-design-";
    return str.startsWith(prefix) ? str.slice(prefix.length) : "";
  };

  return (
    <div 
      style={{
        position: 'absolute',
        zIndex: 10,
        right: '1rem',
        bottom: '1rem',
        display: 'block'
      }}
    >
      <a 
        href={`https://cloud.layer5.io/catalog/content/design/${extractUUID(embedId)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          padding: '0.5rem 1rem',
          color: '#333',
          borderRadius: '6px',
          textDecoration: 'none'
        }}
      >
       <img 
          src={LogoIcon} 
          alt="Meshery Logo"
        /> 
      </a>
    </div>
  );
};

const MesheryDesignEmbed = ({
  embedScriptSrc,
  embedId,
  style = {},
}) => {
  useScript(embedScriptSrc, embedId);

  return (
    <div style={{ position: "relative", width: "100%", height: "30rem", ...style }}>
      {/* CSS Override for hiding original toolbar */}
      <style>
        {`
          #${embedId} .toolbar,
          #${embedId} .water-mark {
            display: none;
          }
        `}
      </style>
      
      <div id={embedId} style={{ width: "100%", height: "100%" }}></div>
      
      {/* Custom React Component Toolbar */}
      <CustomMesheryToolbar embedId={embedId} />
    </div>
  );
};

export default MesheryDesignEmbed;
