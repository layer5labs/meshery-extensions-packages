import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiLink } from 'react-icons/fi';
import CertificationProgram from "../../../static/assets/badges/certification-program/certification-program.png";
import MeshMasterCertified from "../../../static/assets/badges/meshmaster-certified/meshmaster-certified.png";
import CertifiedMesheryContributor from "../../../static/assets/badges/certified-meshery-contributor/certified-meshery-contributor.png";
import CertifiedMesheryAssociate from "../../../static/assets/badges/certified-meshery-associate/certified-meshery-associate.png";
import CertifiedMesheryProfessional from "../../../static/assets/badges/certified-meshery-professional/certified-meshery-professional.png";
import CertifiedMesheryExpert from "../../../static/assets/badges/certified-meshery-expert/certified-meshery-expert.png";
import CertifiedMesheryDeveloper from "../../../static/assets/badges/certified-meshery-developer/certified-meshery-developer.png";

import BadgesWrapper from './Badges.styles';
const jsonData = require('../../badgesInfo.json');

const SectionHeading = ({ id, title, onCopy, feedback }) => {
  const isActive = feedback?.id === id;
  const message =
    isActive && feedback?.status === 'copied'
      ? 'Link copied!'
      : isActive && feedback?.status === 'link-ready'
        ? 'Link ready!'
        : '\u00A0';

  return (
    <div className="badge-section-heading" id={id}>
      <h2>{title}</h2>
      <button
        type="button"
        className="heading-anchor"
        onClick={() => onCopy(id)}
        aria-label={`Copy link to ${title}`}
        title="Copy link to this section"
      >
        <FiLink aria-hidden="true" size={18} />
        <span className="sr-only">Copy link to {title}</span>
      </button>
      <span
        className={`copy-feedback ${isActive ? 'visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </span>
    </div>
  );
};

const copyTextToClipboard = async (text) => {
  if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // fall back to legacy method if available
    }
  }

  if (typeof document !== 'undefined') {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    } catch (error) {
      return false;
    }
  }

  return false;
};

const Footer = () => {
  const [copyFeedback, setCopyFeedback] = useState({ id: null, status: null });
  const feedbackTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const showFeedback = useCallback((id, status) => {
    setCopyFeedback({ id, status });
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    feedbackTimeoutRef.current = setTimeout(
      () => setCopyFeedback({ id: null, status: null }),
      2000
    );
  }, []);

  const handleCopyLink = useCallback(
    async (id) => {
      if (typeof window === 'undefined') {
        return;
      }

      const { origin, pathname } = window.location;
      const url = `${origin}${pathname}#${id}`;
      const copied = await copyTextToClipboard(url);

      showFeedback(id, copied ? 'copied' : 'link-ready');

      try {
        window.history.replaceState(null, '', `#${id}`);
      } catch (error) {
        window.location.hash = id;
      }
    },
    [showFeedback]
  );

  return (
    <BadgesWrapper>
      <SectionHeading
        id="special-edition-badges"
        title="Special Edition Badges"
        onCopy={handleCopyLink}
        feedback={copyFeedback}
      />
      <div className="badge-grid">
        {jsonData.specialEditionBadges.map((badge) => {
          return (
            <div key={badge.slug}>
              <img src={badge.location} alt="Layer5 badges" />
              <span>{badge.title}</span>
              <span className="badge-label">{badge.label}</span>
              <p>{badge.description}</p>
            </div>
          );
        })}
      </div>

      <SectionHeading
        id="achievement-badges"
        title="Achievement Badges"
        onCopy={handleCopyLink}
        feedback={copyFeedback}
      />
      <div className="badge-grid">
        {jsonData.achievementBadges.map((badge) => {
          return (
            <div key={badge.slug}>
              <img src={badge.location} alt="Layer5 badges" />
              <span>{badge.title}</span>
              <span className="badge-label">{badge.label}</span>
              <p>{badge.description}</p>
            </div>
          );
        })}
      </div>

      <SectionHeading
        id="project-badges"
        title="Project Badges"
        onCopy={handleCopyLink}
        feedback={copyFeedback}
      />

      <div className="badge-grid">
        {jsonData.projectBadges.map((badge) => {
          return (
            <div key={badge.slug}>
              <img src={badge.imageSource} alt="Layer5 badges" />
              <span>{badge.title}</span>
              <span className="badge-label">{badge.label}</span>
              <p dangerouslySetInnerHTML={{__html: badge.description}}></p>
            </div>
         );
       })}
      </div>

      <SectionHeading
        id="certification-badges"
        title="Certification Badges"
        onCopy={handleCopyLink}
        feedback={copyFeedback}
      />
      <div className="badge-grid">
        <div>
          <img src={CertifiedMesheryContributor} alt="Certified Meshery Contributor badge" />
          <span>Certified Meshery Contributor</span>
          <p>
            This certificate is recognizes individuals who have demonstrated a clear understanding of each major Meshery architectural component, the frameworks, and the process of contribution.
          </p>
        </div>
        <div>
          <img src={CertifiedMesheryDeveloper} alt="Certified Meshery Developer badge" />
          <span>Certified Meshery Developer</span>
          <p>
            This certificate is recognizes individuals who have demonstrated a clear understanding of each major Meshery architectural component, the frameworks, and the process of contribution.
          </p>
        </div>
        <div>
          <img src={CertifiedMesheryAssociate} alt="Certified Meshery Associate badge" />
          <span>Certified Meshery Associate</span>
          <p>
            This entry-level certification validates a foundational knowledge of Meshery&apos;s core concepts and working knowledge of all major functional components.
          </p>
        </div>
        <div>
          <img src={CertifiedMesheryProfessional} alt="Certified Meshery Professional badge" />
          <span>Certified Meshery Professional</span>
          <p>
            This professional-level certification validates the practical ability to use Meshery for real-world infrastructure design, provisioning, and performance management.
          </p>
        </div>
        <div>
          <img src={CertifiedMesheryExpert} alt="Certified Meshery Expert badge" />
          <span>Certified Meshery Expert</span>
          <p>
            This advanced-level certification validates deep expertise in operating, troubleshooting, and extending the Meshery platform through systems integration.
          </p>
        </div>
        {/* <div>
          <img src={MeshMasterCertified} alt="Layer5 badges" />
          <span>MeshMaster</span>
          <p>This badge is awarded to individuals who have demonstrated a clear and holistic understanding of cloud native infrastructure management.</p>
        </div>
        <div>
          <img src={CertificationProgram} alt="Layer5 badges" />
          <span>Coming Soon...</span>
          <p>Additional certifications are coming soon!</p>
        </div> */}
      </div>
    </BadgesWrapper>
  )
}

export default Footer; 
