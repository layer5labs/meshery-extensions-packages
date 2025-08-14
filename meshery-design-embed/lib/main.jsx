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
  mode = "open",
  style = {},
}) => {
  useScript(embedScriptSrc, designLink);

  // Extract design ID from designLink URL
  const extractDesignId = (url) => {
    if (!url) return null;
    const match = url.match(/design\/([^/?]+)/);
    return match ? match[1] : null;
  };

  const designId = extractDesignId(designLink);
  const baseUrl = designLink ? new URL(designLink).origin : null;

  // Check if user is logged in (placeholder - implement based on your auth system)
  const isLoggedIn = () => {
    // This should be replaced with actual auth check
    // e.g., check localStorage, cookies, or call auth API
    return localStorage.getItem('meshery_auth_token') !== null;
  };

  // Handle Open mode - Open Original
  const handleOpen = () => {
    if (!isLoggedIn()) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(designLink);
      const loginUrl = `${baseUrl}/login?returnUrl=${returnUrl}`;
      window.open(loginUrl, '_blank');
    } else {
      // Already logged in, open directly
      window.open(designLink, '_blank');
    }
  };

  // Handle Clone mode - Create and Open Independent Copy
  const handleClone = async () => {
    try {
      if (!designId || !baseUrl) {
        console.error('Missing design ID or base URL');
        return;
      }

      // POST to clone API
      const response = await fetch(`${baseUrl}/api/designs/${designId}/clone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth headers if needed
          // 'Authorization': `Bearer ${localStorage.getItem('meshery_auth_token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`Clone failed: ${response.statusText}`);
      }

      const data = await response.json();
      const newDesignId = data.newDesignId || data.id;

      if (!newDesignId) {
        throw new Error('No new design ID returned from clone API');
      }

      // Extract design name and create new link
      const urlParams = new URL(designLink).searchParams;
      const designName = urlParams.get('name') || 'design';
      const newDesignName = `${designName}-copy`;

      // Create new link (example format from your description)
      const newLink = `${baseUrl}/extension/meshmap?mode=design&type=design&id=${newDesignId}&name=${newDesignName}`;
      
      window.open(newLink, '_blank');
    } catch (error) {
      console.error('Error cloning design:', error);
      alert('Failed to clone design. Please try again.');
    }
  };

  // Determine button text and handler based on mode
  const buttonText = mode === 'clone' ? 'Clone in Meshery' : 'Open in Meshery';
  const handleButtonClick = mode === 'clone' ? handleClone : handleOpen;

  return (
    <div style={{ width: "100%", height: "30rem", ...style }}>
      {/* Embed script injection (iframe or script tag logic here) */}
      <div id={designLink}></div>

      {/* Show button only if designLink exists */}
      {designLink && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default MesheryDesignEmbed;
