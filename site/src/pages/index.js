import styled from 'styled-components';
import { Main } from '../sitecomponents/App.style';
import Footer from '../sitecomponents/Footer/index';
import { ThemeProvider } from 'styled-components';
import {
  darkTheme,
  GlobalStyle,
  lightTheme,
} from '../sitecomponents/index.style.js';
import { useDarkMode } from '../sitecomponents/useDarkMode';
import Navigation from '../sitecomponents/Navigation/index';
import Faq from '../sitecomponents/Faq/index';
import React, { useState } from 'react';
import BadgeGrid from '../sitecomponents/BadgeGrid/index';
import recognitionLogo from '../assets/images/recognition-program.png';
import recognitionBanner from '../assets/images/recognition-banner.png';
import '../fonts.css';
import GithubLogo from './githubLogo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import layer5Logo from '../assets/images/layer5/layer5-badges.png';
import layer5LogoLight from '../assets/images/layer5/layer5-badges-white.png';
import '../fonts.css';

// Styled Components
const BannerLogos = styled.div`
  padding: 3rem 2rem;
  background: ${({ theme }) => theme === 'light' ? '#ffffff' : '#1a1f25'};
  border-radius: 16px;
  margin: 3rem 0;
  border: 1px solid ${({ theme }) => theme === 'light' ? '#e6eaee' : '#2a3038'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00b39f 0%, #00d3aa 50%, #00b39f 100%);
  }
`;

const BannerContent = styled.div`
  h3 {
    text-align: left;
    color: ${({ theme }) => theme === 'light' ? '#3c494e' : '#ffffff'};
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 2rem;
    line-height: 1.3;
    font-family: 'Qanelas Soft', 'Nunito Sans', sans-serif;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const DisplayBadgeStepsParent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const DisplayBadge = styled.div`
  flex: 1;
`;

const DisplayBadgeSteps = styled.div`
  background: ${({ theme }) => theme === 'light' ? '#ffffff' : '#242b33'};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme === 'light' ? '#e6eaee' : '#3a4249'};
  box-shadow: ${({ theme }) => theme === 'light' 
    ? '0 4px 20px rgba(60, 73, 78, 0.08)'
    : '0 4px 20px rgba(0, 0, 0, 0.5)'};
  transition: all 0.3s ease;
  font-family: 'Qanelas Soft', 'Nunito Sans', sans-serif;
`;

const StepsList = styled.ol`
  font-family: 'Qanelas Soft', 'Nunito Sans', sans-serif;
  margin: 0;
  padding-left: 0;
  counter-reset: step-counter;
`;

const StepItem = styled.li`
  font-family: 'Qanelas Soft', 'Nunito Sans', sans-serif;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: ${({ theme }) => theme === 'light' ? '#667085' : '#c5ccd6'};
  font-size: 1rem;
  list-style: none;
  position: relative;
  padding-left: 3rem;
  counter-increment: step-counter;

  &::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: linear-gradient(135deg, #00b39f 0%, #00d3aa 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    box-shadow: 0 2px 8px rgba(0, 179, 159, 0.3);
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 1rem;
    top: 2rem;
    bottom: -1.5rem;
    width: 2px;
    background: ${({ theme }) => theme === 'light' ? '#e6eaee' : '#3a4249'};
    transform: translateX(-50%);
  } 
`;

const CloudLink = styled.a`
  color: ${({ theme }) => theme === 'light' ? '#00b39f' : '#00d3aa'};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme === 'light' ? '#00d3aa' : '#7dd3c0'};
    text-decoration: underline;
  }
`;

const BadgePreview = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme === 'light' 
    ? 'linear-gradient(135deg, #e6f7f5 0%, #d1f2ed 100%)'
    : 'linear-gradient(135deg, #0d4d3f 0%, #1a5f4e 100%)'};
  border: 1px solid ${({ theme }) => theme === 'light' ? '#00b39f30' : '#00b39f40'};
  border-radius: 8px;
  transition: all 0.3s ease;
`;

const PreviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme === 'light' ? '#0d5d4f' : '#7dd3c0'};
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
  font-family: 'Qanelas Soft', 'Nunito Sans', sans-serif;

`;

const GithubLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme === 'light' ? '#ffffff' : '#242b33'};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme === 'light' ? '#e6eaee' : '#3a4249'};
  min-height: 180px;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme === 'light' ? '#00b39f20' : '#00b39f10'}, 
      ${({ theme }) => theme === 'light' ? '#00d3aa20' : '#00d3aa10'});
    opacity: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [showSignUpButton, setShowSignUpButton] = useState(true);
  const fillColor = theme === 'light' ? '#24292F' : '#ffffff';
  const queryClient = new QueryClient();
  const Logo = theme === 'light' ? layer5Logo : layer5LogoLight;
  // const handleSignUpFormSubmit = () => {
  //   setShowSignUpButton(false);
  // };
  return (
    <>
      <title>Layer5 Recognition Program</title>
      <meta
        name="description"
        content="Showcasing Your Achievements as a User and a Contributor"
      />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themeMode}>
          <GlobalStyle />
          <Navigation
            theme={theme}
            toggleTheme={toggleTheme}
            showSignUpButton={showSignUpButton}
            logo={Logo}
          />
          <Main>
            <section className="hero">
              <img
                className="program-logo"
                src={recognitionLogo}
                alt="Recognition Program Logo"
              />
              <h3 className="try-now-txt">
                Showcasing Your Achievements as a User and a Contributor
              </h3>
              <h1>Layer5 Recognition Program</h1>
              <p className="desc-text">
                Layer5 badges are one of the many ways that we recognize the
                efforts of our contributors and uplift our users. Layer5 badges
                represent milestones that you achieve both in using and in
                contributing to Layer5-supported open source projects. As a
                contributor, this is how you demonstrate your ownership,
                dedication, skills and commitment. As a user, this is how
                you demonstrate your prowess, milestones, and meaningful engagement.
              </p>
              <div className="banner-main">
                <img src={recognitionBanner} alt="Recognition Program Banner" />
              </div>
              <p>
                See the{' '}
                <a href="https://layer5.io/community/handbook/recognition">
                  Recognition
                </a>{' '}
                section of the{' '}
                <a href="https://layer5.io/community/handbook/recognition">
                  Layer5 Community Handbook
                </a>{' '}
                for details of when and how each badge is awarded.
              </p>     
              <section className="faq">
              {/* <h1>Frequently Asked Questions</h1> */}
                <Faq
                  category={['Layer5 Badges']}
                  display-category-title={'false'}
                />
              </section>
              
              <section className="badges">
                <BadgeGrid />
              </section>
              
              <BannerLogos theme={theme}>
                <BannerContent theme={theme}>
                  <h2 style={{ justifyContent: "center", margin: "1rem auto" }}>Wear your badge proudly.</h2>
                  <h4 style={{ justifyContent: "center", margin: "1rem auto" }}>Embed your Layer5 badges in your GitHub profile. Follow these steps to display your badge:</h4>
                  <DisplayBadgeStepsParent>
                    <DisplayBadge>
                      <DisplayBadgeSteps theme={theme}>
                        <StepsList>
                          <StepItem theme={theme}>
                            Visit your Layer5 Cloud
                            {' '}
                            <CloudLink href="https://cloud.layer5.io/users" theme={theme}>
                            user profile
                            </CloudLink>
                            {' '} to see badges you have earned
                          </StepItem>
                          <StepItem theme={theme}>
                            Click on the badge you want to display on your profile
                          </StepItem>
                          <StepItem theme={theme}>
                            Copy the markdown embed code that's displayed
                          </StepItem>
                          <StepItem theme={theme}>
                            Paste the code in your GitHub profile README to <a href="https://github.com/mascot-five" target="_blank">showcase your achievement</a>
                          </StepItem>
                        </StepsList>
                      </DisplayBadgeSteps>
                    </DisplayBadge>
                    
                    <a href="https://github.com/mascot-five" target="_blank"><GithubLogoContainer theme={theme}>
                      <GithubLogo
                        fillColor={fillColor}
                        width="8rem"
                        height="7rem"
                      />
                    </GithubLogoContainer></a>
                  </DisplayBadgeStepsParent>
                  {/* <ReactPlayer  
              url="https://youtu.be/Do7htKrRzDA"
              playing
              controls
              light={mesheryPlayground}
              width="90%"
              style={{ margin: "auto" }}
              className="embedVideo"
            /> */}

              {/* <p className="caption">Launch and learn with Meshery</p>
            <p className="byline">The cloud native playground contains a set of learning paths that incorporate an application networking centric curriculum featuring training on 200+ integrations.</p> */}
            
                  <BadgePreview theme={theme}>
                    <PreviewText theme={theme}>
                      Your badge will appear in your GitHub profile, showcasing your Layer5 community contributions!
                    </PreviewText>
                  </BadgePreview>
                </BannerContent>
              </BannerLogos>
            </section>
            {/* <section className="form" id="signup-form">
            <SignupForm onSubmit={handleSignUpFormSubmit}  />
          </section> */}
            <section className="join-community">
              <div>
                <h1>Join the community!</h1>
                <p>Engage in the Layer5 community by joining us on Slack</p>
                <div className="btn-container">
                  <div>
                    <a href="https://slack.layer5.io/">
                      Join Our Open Source Community
                    </a>
                  </div>
                  {/* <div>
                    <a
                      href="/discussion-leaderboard"
                      className="btn-secondary"
                    >
                      Discussion Forum Leaderboard
                    </a>
                  </div> */}
                </div>
              </div>
            </section>
          </Main>
          <Footer />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;