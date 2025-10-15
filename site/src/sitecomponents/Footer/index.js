import React from 'react';
import SlackIcon from '../../assets/images/social-icons/slack.svg';
import DockerIcon from '../../assets/images/social-icons/docker.svg';
import YoutubeIcon from '../../assets/images/social-icons/youtube.svg';
import TwitterIcon from '../../assets/images/social-icons/twitter.svg';
import GithubIcon from '../../assets/images/social-icons/github.svg';
import CalendarIcon from '../../assets/images/social-icons/calendar.png';
import LinkedinIcon from '../../assets/images/social-icons/linkedin.png';
import FooterWrapper from './Footer.styles';

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <div className="footer-links resources">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/community">
              Project
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a className="category-link" href="https://layer5.io/calendar">
                <img src={CalendarIcon} alt="Calendar Icon" />
                Calendar
              </a>
            </li>

            <li>
              <a
                className="category-link"
                href="https://hub.docker.com/u/layer5/"
              >
                <img src={DockerIcon} alt="Docker Icon" />
                Docker Hub
              </a>
            </li>
            <li>
              <a className="category-link" href="https://slack.layer5.io/">
                <img src={SlackIcon} alt="Slack Icon" />
                Slack
              </a>
            </li>
            <li>
              <a className="category-link" href="https://github.com/layer5io/">
                <img src={GithubIcon} alt="GitHub Icon" />
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links getting-started">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/community">
              Getting Started
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a className="category-link" href="https://docs.layer5.io/">
                Docs
              </a>
            </li>
            <li>
              <a className="category-link" href="https://docs.layer5.io/videos">
                Videos
              </a>
            </li>
            <li>
              <a className="category-link" href="https://layer5.io/cloud-native-management/kanvas">
                Kanvas Features
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://layer5.io/cloud-native-management/meshery/integrations"
              >
                Kanvas Integrations
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://kanvas.new"
              >
                Cloud Native Diagramming
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://cloud.layer5.io/catalog"
              >
                Cloud Native Patterns
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links community">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/community">
              Community
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a className="category-link" href="https://discuss.layer5.io/">
                Discussion Forum
              </a>
            </li>
            {/* <li>
              <a
                className="category-link"
                href="https://meshery.io/blog"
              >Blog
              </a>
            </li> */}
            <li>
              <a className="category-link" href="https://cloud.layer5.io/academy">
                Layer5 Academy
              </a>
            </li>
            {/* <li>
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
                href="https://discuss.layer5.io/u?order=likes_received"
              >
                Community Leaderboard
              </a>
            </li> */}
            <li>
              <a
                className="category-link"
                href="https://layer5.io/community/events/"
              >
                Community Events
              </a>
            </li>
            <li>
              <a className="category-link" href="https://layer5.io/subscribe">
                Mailing List
              </a>
            </li>

            <li>
              <a
                className="category-link"
                href="https://docs.kanvas.new"
              >
                Visualizing your Kubernetes Clusters
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links resources">
          <h3 className="section-title">
            <a className="title-link" href="https://layer5.io/resources">
              Social
            </a>
          </h3>
          <ul className="section-categories">
            <li>
              <a className="category-link" href="https://twitter.com/layer5">
                <img src={TwitterIcon} alt="Twitter Icon" />
                Twitter
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://www.youtube.com/Layer5io?sub_confirmation=1"
              >
                <img src={YoutubeIcon} alt="Youtube Icon" />
                Youtube
              </a>
            </li>
            <li>
              <a
                className="category-link"
                href="https://www.linkedin.com/company/layer5/"
              >
                <img src={LinkedinIcon} alt="Linkedin Icon" />
                Linkedin
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container flex copyright">
        <div className="text">
          &copy; {new Date().getFullYear()}- Layer5, Inc. All rights reserved.
        </div>
        <div className="text">Empowering engineers all around the world</div>
        <div className="text">
          <a href="https://layer5.io/company/about">About</a>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
