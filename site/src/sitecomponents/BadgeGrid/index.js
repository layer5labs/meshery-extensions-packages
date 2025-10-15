import React from 'react';
import CertificationProgram from "../../../static/assets/badges/certification-program/certification-program.png";
import MeshMasterCertified from "../../../static/assets/badges/meshmaster-certified/meshmaster-certified.png";
import CertifiedMesheryContributor from "../../../static/assets/badges/certified-meshery-contributor/certified-meshery-contributor.png";
import CertifiedMesheryAssociate from "../../../static/assets/badges/certified-meshery-associate/certified-meshery-associate.png";
import CertifiedMesheryProfessional from "../../../static/assets/badges/certified-meshery-professional/certified-meshery-professional.png";
import CertifiedMesheryExpert from "../../../static/assets/badges/certified-meshery-expert/certified-meshery-expert.png";
import CertifiedMesheryDeveloper from "../../../static/assets/badges/certified-meshery-developer/certified-meshery-developer.png";
import CustomTooltip from '@sistent/sistent';
import BadgesWrapper from './Badges.styles';
const jsonData = require('../../badgesInfo.json');

const Footer = () => {
  return (
    <BadgesWrapper>
      <h2>Special Edition Badges</h2>
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

      <h2>Achievement Badges</h2>
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

      <h2>Project Badges</h2>

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
         
          <h2 id="certification">Certification Badges</h2>
          <div className="badge-grid">
      <CustomTooltip title="This certificate recognizes individuals who have demonstrated a clear understanding of each major Meshery architectural component, the frameworks, and the process of contribution.">
        <div>
          <img src={CertifiedMesheryContributor} alt="Certified Meshery Contributor badge" />
          <span>Certified Meshery Contributor</span>
          <p>This certificate is recognizes individuals who have demonstrated a clear understanding of each major Meshery architectural component, the frameworks, and the process of contribution.</p>
        </div>
      </CustomTooltip>
      <CustomTooltip title={value.title}></CustomTooltip>
      <CustomTooltip title="The Certified Meshery Developer (CMD) is an advanced certification for developers who build and integrate extensions for the Meshery platform. As a higher tier than the Meshery Certified Contributor (MCC), the CMD shifts focus from contributing to the core project to the specific development of user-facing components and backend integrations that plug into Meshery.

This certification is designed in parallel with the objectives of the Certified Kubernetes Application Developer (CKAD), emphasizing the practical, hands-on skills required to design, build, and deploy extensions within the Meshery ecosystem. It validates a specific skillset: platform extension and integration.">
        <div>
          <img src={CertifiedMesheryDeveloper} alt="Certified Meshery Developer badge" />
          <span>Certified Meshery Developer</span>
          <p>This certificate is recognizes individuals who have demonstrated a clear understanding of each major Meshery architectural component, the frameworks, and the process of contribution.</p>
        </div>
      </CustomTooltip>
      <CustomTooltip title="This entry-level certification validates a foundational knowledge of Meshery's core concepts and working knowledge of all major functional components.">
        <div>
          <img src={CertifiedMesheryAssociate} alt="Certified Meshery Associate badge" />
          <span>Certified Meshery Associate</span>
          <p>This entry-level certification validates a foundational knowledge of Meshery's core concepts and working knowledge of all major functional components.</p>
        </div>
      </CustomTooltip>
      <CustomTooltip title="This professional-level certification validates the practical ability to use Meshery for real-world infrastructure design, provisioning, and performance management.">
        <div>
          <img src={CertifiedMesheryProfessional} alt="Certified Meshery Professional badge" />
          <span>Certified Meshery Professional</span>
          <p>This professional-level certification validates the practical ability to use Meshery for real-world infrastructure design, provisioning, and performance management.</p>
        </div>
      </CustomTooltip>
      <CustomTooltip title="This advanced-level certification validates deep expertise in operating, troubleshooting, and extending the Meshery platform through systems integration.">
        <div>
          <img src={CertifiedMesheryExpert} alt="Certified Meshery Expert badge" />
          <span>Certified Meshery Expert</span>
          <p>This advanced-level certification validates deep expertise in operating, troubleshooting, and extending the Meshery platform through systems integration.</p>
        </div>
      </CustomTooltip>
      {/* <div>
      <img src={MeshMasterCertified} alt="Layer5 badges" />
        <span>MeshMaster</span> <p>This badge is awarded to individuals who have demonstrated a clear and holistic understanding of cloud native infrastructure management.</p>
      </div>
      <div>
      <img src={CertificationProgram} alt="Layer5 badges" />
        <span>Coming Soon...</span> <p>Additional certications are coming soon!</p>
      </div> */}}
      </div>
    </BadgesWrapper>
  )
}

export default Footer; 
