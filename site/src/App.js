import SignupForm from "./components/SignupForm";
import { Main } from './App.style.js';
// import mesheryPlayground from "./assets/images/meshery-playground-meshmap.png";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle, lightTheme } from './index.style.js';
import { useDarkMode } from "./components/useDarkMode";
// import ReactPlayer from 'react-player/youtube'
import Navigation from "./components/Navigation";
import Faq from "./components/Faq";
import { useState } from "react";
import BadgeGrid from "./components/BadgeGrid";

const App = () => {

  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [showSignUpButton, setShowSignUpButton] = useState(true);

  const handleSignUpFormSubmit = () => {
    setShowSignUpButton(false);
  };

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <Navigation theme={theme} toggleTheme={toggleTheme} showSignUpButton={showSignUpButton} />
        <Main>
          <section className="hero">
            <h3 className="try-now-txt">Showcasing Your Achievements as a User and a Contributor</h3>
            <h1>
            Layer5 Recognition Program
            </h1>

            <p className="desc-text">
            Layer5 badges are one of the many ways that we recognize the efforts of our contributors and uplift our users. Layer5 badges represent milestones that you achieve both in using and in contributing to Layer5-supported open source projects. As a contributor, this is how you demonstrate your ownership, dedication, skills and loyalty to Layer5. As a user, this is how you demonstrate your prowess.
            </p>
            <p>See the <a href="https://layer5.io/community/handbook/recognition">Recognition</a> section of the <a href="https://layer5.io/community/handbook/recognition">Layer5 Community Handbook</a> for details of when and how each badge is awarded.</p>
            <section className="faq">
              {/* <h1>Frequently Asked Questions</h1> */}
              <Faq category={["Layer5 Badges"]}   
                  display-category-title={"false"} />
            </section>
            <section className="badges">
              <BadgeGrid  />
            </section>
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
          </section>
          {/* <section className="form" id="signup-form">
            <SignupForm onSubmit={handleSignUpFormSubmit}  />
          </section> */}

          <section className="join-community">
            <div>
              <h1>Join the community!</h1>
              <p>Engage in the Layer5 community by joining us on Slack</p>
              <a href="https://slack.layer5.io/" >Join Our Open Source Community</a>
            </div>
          </section>
        </Main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
