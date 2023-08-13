import React from 'react';
import CertificationProgram from "../../assets/images/certification-program.png";
import MeshMasterCertified from "../../assets/images/meshmaster-certified.png";

import BadgesWrapper from './Badges.styles';
const jsonData = require('../../badgesInfo.json');

const Footer = () => {
  return (
    <BadgesWrapper>
      <h2>Achievement Badges</h2>
      <div className="badge-grid">
        {jsonData.achievementBadges.map((badge) => {
          return (
            <div key={badge.slug}>
              <img src={badge.location} alt="Layer5 badges" />
              <span>{badge.title}</span>
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
              <p>{badge.description}</p>
            </div>
          );
       })}
      </div>
      {/* <div className="container">
      <div className='footer-links resources'> 
          <h3 className="section-title">
            <a className="title-link" href='https://meshery.io/community'>
              Project
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a
                className="category-link"
                href="https://meshery.io/calendar"
              >
                <img src={CalendarIcon} alt="Calendar Icon" />
                Calendar
              </a>
            </li>

            <li>
              <a
                className="category-link"
                href="https://hub.docker.com/u/meshery/"
              >
                <img src={DockerIcon} alt="Docker Icon" />
                Docker Hub
              </a>
            </li>                  
            <li>
              <a
                className="category-link"
                href="https://slack.meshery.io/"
              >
                <img src={SlackIcon} alt="Slack Icon" />
                Slack
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://github.com/meshery/play"
              >
                <img src={GithubIcon} alt="GitHub Icon" />
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className='footer-links getting-started'> 
          <h3 className="section-title">
            <a className="title-link" href="https://meshery.io/#getting-started">
              Getting Started
            </a>
          </h3>
          <ul className="section-categories">
          <li>
              <a
                className="category-link"
                href="https://docs.meshery.io/"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/features"
              >Features
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/integrations"
              >
                Integrations
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/#getting-started"
              >
                Run Meshery
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://meshery.io/catalog"
              >
                Meshery Catalog
              </a>
            </li>
          </ul>
        </div>
        <div className='footer-links community'> 
          <h3 className="section-title">
            <a className="title-link" href='https://meshery.io/community'>
              Community
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a
                className="category-link"
                href="http://discuss.meshery.io/"
              >
                Discussion Forum
              </a>
            </li>
            {/* <li>
              <a
                className="category-link"
                href="https://meshery.io/blog"
              >Blog
              </a>
            </li> 
            <li>
              <a
                className="category-link"
                href="https://cloud.meshery.io"
              >
                Meshery Cloud
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/community/members"
              >
                Community Members
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/community/events/"
              >
                Community Events
              </a>
            </li>      
            <li>
              <a
                className="category-link"
                href="https://meshery.io/subscribe"
              >
                Mailing Lists
              </a>
            </li>    

            <li>
              <a
                className="category-link"
                href="https://layer5.io/service-mesh-landscape"
              >Service Mesh Comparison
              </a>
            </li>
          </ul>
        </div>
        <div className='footer-links resources'> 
          <h3 className="section-title">
            <a className="title-link" href='https://layer5.io/resources'>
              Social
            </a>
          </h3>
          <ul className="section-categories">
          <li>
              <a
                className="category-link"
                href="https://twitter.com/mesheryio/"
              >
                <img src={TwitterIcon} alt="Twitter Icon"/>
                Twitter
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://www.youtube.com/channel/UCFL1af7_wdnhHXL1InzaMvA"
              >
                <img src={YoutubeIcon} alt="Youtube Icon" />
                Youtube
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://www.linkedin.com/company/meshery/"
              >
                <img src={LinkedinIcon} alt="Linkedin Icon" />
                Linkedin
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container flex copyright">
        <div className="text">&copy; {new Date().getFullYear()}- The Meshery Authors</div>
        <div className="text">Proudly representing every CNCF project</div>
        <div className="text"><a href="https://github.com/meshery/meshery/blob/master/CODE_OF_CONDUCT.md">Code of Conduct</a></div>
      </div> */}


<h2 id="certification">Certification Badges</h2>
    <div className="badge-grid">
        <div>
        <img style={{width:"20vw"}} src={MeshMasterCertified} alt="Layer5 badges" />
          <span>MeshMaster</span> <p>This badge is awarded to individuals who have demonstrated a clear and holistic understanding of cloud native infrastructure management.</p>
        </div>
        <div>
        <img style={{width:"20vw"}} src={CertificationProgram} alt="Layer5 badges" />
          <span>Coming soon...</span> <p>Additional certications are coming soon!</p>
        </div>
      </div>
    </BadgesWrapper>
  )
}

export default Footer; 
