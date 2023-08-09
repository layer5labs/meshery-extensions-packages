import React from 'react';
// import SlackIcon from "../../assets/images/social-icons/slack.svg";
// import DockerIcon from "../../assets/images/social-icons/docker.svg";
// import YoutubeIcon from "../../assets/images/social-icons/youtube.svg";
// import TwitterIcon from "../../assets/images/social-icons/twitter.svg";
// import GithubIcon from "../../assets/images/social-icons/github.svg";
// import CalendarIcon from "../../assets/images/social-icons/calendar.png";
// import LinkedinIcon from "../../assets/images/social-icons/linkedin.png";
import BadgesWrapper from './Badges.styles';
const jsonData = require('../../badgesInfo.json')

const Footer = () => {
  return (
    <BadgesWrapper>
      <h3>Achievement Badges</h3>
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

      <h3>Project Badges</h3>

      <div className="badge-grid">
        <div>
          <img src="assets/badges/ui-ux/ui-ux.png" alt="Layer5 badges" />
          <span>UI/UX</span> <p>This badge is awarded to the community members who create or improve designs for visual aspects or user flow for any of the websites, flyers, promotions, Meshery UI, and so on in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="assets/badges/meshmap/meshmap.png" alt="Layer5 badges" />
          <span>MeshMap</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://layer5.io/cloud-native-management/meshmap">MeshMap</a> project in recognition and appreciation of their efforts. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="assets/badges/smp/smp.png" alt="Layer5 badges" />
          <span>Service Mesh Performance</span> <p>This badge isawarded to the community members who make consistent and impactful contributions to the Service Mesh Performance project. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="assets/badges/community/community.png" alt="Layer5 badges" />
          <span>Community</span> <p>This badge is awarded to the community members who repeatedly engage in welcoming, encouraging, and supporting other Layer5 community members. Community members who earn this badge occasionally graduate to undertaking the Community Manager role.</p>
        </div>
        <div>
          <img src="assets/badges/meshery/meshery.png" alt="Layer5 badges" />
          <span>Meshery</span> <p>This badge isawarded to the community members who make consistent and impactful contributions to the Meshery project. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="assets/badges/patterns/patterns.png" alt="Layer5 badges" />
          <span>Patterns</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://service-mesh-patterns.github.io/service-mesh-patterns">Service Mesh Patterns</a> project in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="assets/badges/landscape/landscape.png" alt="Layer5 badges" />
          <span>Landscape</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the layer5.io website.</p>
        </div>
        <div>
          <img src="assets/badges/nighthawk/nighthawk.png" alt="Layer5 badges" />
          <span>Nighthawk</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the NightHawk project in recognition and appreciation of their efforts. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="assets/badges/meshery-catalog/meshery-catalog.png" alt="Layer5 badges" />
          <span>Meshery Catalog</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://meshery.io/catalog">Meshery Catalog</a> of Meshery project in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="assets/badges/docker-extension/docker-extension.png" alt="Layer5 badges" />
          <span>Docker Extension</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the Docker Extension of meshery project in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="assets/badges/meshery-docs/meshery-docs.png" alt="Layer5 badges" /> <span>Meshery Docs</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://docs.meshery.io">Meshery Docs</a> in recognition and appreciation of their efforts.</p>
        </div>
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
    </BadgesWrapper>
  )
}

export default Footer; 
