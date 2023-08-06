import React from 'react';
// import SlackIcon from "../../assets/images/social-icons/slack.svg";
// import DockerIcon from "../../assets/images/social-icons/docker.svg";
// import YoutubeIcon from "../../assets/images/social-icons/youtube.svg";
// import TwitterIcon from "../../assets/images/social-icons/twitter.svg";
// import GithubIcon from "../../assets/images/social-icons/github.svg";
// import CalendarIcon from "../../assets/images/social-icons/calendar.png";
// import LinkedinIcon from "../../assets/images/social-icons/linkedin.png";
import BadgesWrapper from './Badges.styles';


const Footer = () => {
  return (
    <BadgesWrapper>
      <h3>Achievement Badges</h3>
      <div class="badge-grid">
        <div>
          <img src="/assets/badges/bring-a-buddy/bring-a-buddy.svg" alt="Layer5 badges" /><span>Bring a Buddy</span> <p>This badge is awarded to the users who invite someone to Layer5 cloud.</p>
        </div>
        <div>
          <img src="https://github.com/layer5labs/meshery-extensions-packages/raw/master/assets/badges/first-application/first-application.svg" alt="Layer5 badges" />
          <span>Application Pioneer</span> <p>This badge is awarded to the Layer5 cloud users when they create their first application.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/first-design/first-design.svg" alt="Layer5 badges" />
          <span>Design Pioneer</span> <p>This badge is awarded to the Layer5 cloud users when they create their first design.</p>
        </div>
        <div>
          <img src="https://github.com/layer5labs/meshery-extensions-packages/raw/master/assets/badges/first-share/first-share.svg" alt="Layer5 badges" />
          <span>Sharing is Caring</span> <p>This badge is awarded upon first-time sharing one of your designs.</p>
        </div>
        <div>
          <img src="https://github.com/layer5labs/meshery-extensions-packages/raw/master/assets/badges/first-deployment/first-deployment.svg" alt="Layer5 badges" />
          <span>Shipped</span> <p>This badge is awarded upon the success of your first design deployment.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/need-for-speed/need-for-speed.svg" alt="Layer5 badges" />
          <span>Need for Speed</span> <p>This badge is awarded upon successful execution of your first performance test.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/first-interactive-terminal-session/first-interactive-terminal-session.svg" alt="Layer5 badges" />
          <span>Hip Hacker</span> <p>This badge is awarded the first time that you establish an interactive terminal session with a Kubernetes Pod.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/first-log-streaming-session/first-log-streaming-session.svg" alt="Layer5 badges" /> <span>Log Streamer</span> <p>This badge is awarded the first time that you stream logs from a Kubernetes Pod.</p>
        </div>
        <div>
          <img src="https://github.com/layer5labs/meshery-extensions-packages/raw/master/assets/badges/first-collaborator/first-collaborator.svg" alt="Layer5 badges" />
          <span>GitOps with Friends</span> <p>This badge is awarded the first time a collaborator saves changes to one of your designs.</p>
        </div>
      </div>

      <h3>Project Badges</h3>

      <div class="badge-grid">
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/ui-ux/ui-ux.svg" alt="Layer5 badges" />
          <span>UI/UX</span> <p>This badge is awarded to the community members who create or improve designs for visual aspects or user flow for any of the websites, flyers, promotions, Meshery UI, and so on in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshmap/meshmap.svg" alt="Layer5 badges" />
          <span>MeshMap</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://layer5.io/cloud-native-management/meshmap">MeshMap</a> project in recognition and appreciation of their efforts. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/smp/smp.svg" alt="Layer5 badges" />
          <span>Service Mesh Performance</span> <p>This badge isawarded to the community members who make consistent and impactful contributions to the Service Mesh Performance project. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/community/community.svg" alt="Layer5 badges" />
          <span>Community</span> <p>This badge is awarded to the community members who repeatedly engage in welcoming, encouraging, and supporting other Layer5 community members. Community members who earn this badge occasionally graduate to undertaking the Community Manager role.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshery/meshery.svg" alt="Layer5 badges" />
          <span>Meshery</span> <p>This badge isawarded to the community members who make consistent and impactful contributions to the Meshery project. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/patterns/patterns.svg" alt="Layer5 badges" />
          <span>Patterns</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://service-mesh-patterns.github.io/service-mesh-patterns">Service Mesh Patterns</a> project in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/landscape/landscape.svg" alt="Layer5 badges" />
          <span>Landscape</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the layer5.io website.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/nighthawk/nighthawk.svg" alt="Layer5 badges" />
          <span>Nighthawk</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the NightHawk project in recognition and appreciation of their efforts. Community members who earn this badge occasionally become a project maintainer.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshery-catalog/meshery-catalog.svg" alt="Layer5 badges" />
          <span>Meshery Catalog</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://meshery.io/catalog">Meshery Catalog</a> of Meshery project in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/docker-extension/docker-extension.svg" alt="Layer5 badges" />
          <span>Docker Extension</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the Docker Extension of meshery project in recognition and appreciation of their efforts.</p>
        </div>
        <div>
          <img src="https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/assets/badges/meshery-docs/meshery-docs.svg" alt="Layer5 badges" /> <span>Meshery Docs</span> <p>This badge is awarded to the community members who make consistent and impactful contributions to the <a href="https://docs.meshery.io">Meshery Docs</a> in recognition and appreciation of their efforts.</p>
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
