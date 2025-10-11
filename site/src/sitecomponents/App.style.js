import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;

  nav {
    background: ${({ theme }) => theme.body};
    display: flex;
    flex: auto;
    padding: 1.5rem 10rem;
    transition: all 0.3s ease 0s;
    justify-content: space-between;
    align-items: center;
    align-content: flex-end;
    position: relative;
  }

  .scrolled {
    box-shadow: rgba(0, 179, 159, 0.2) 0px 10px 25px;
  }

  img.logo {
    align-self: center;
    max-width: 400px;
    height: auto;
  }
  .themeToggle {
    margin: auto 0.5rem;
    padding: auto 0.5rem;
    svg {
      width: 40px;
      height: 40px;
    }
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .signup-btn,
  .login-btn {
    font-size: calc(16px + 6 * ((50vw - 320px) / 680));
    transition: 0.2s ease-in-out;
    margin: auto 0.5rem;
  }
  .signup-btn {
    padding: 1rem 1.5rem;
    text-align: center;
    color: #fff;
    background: rgba(235, 192, 23, 1);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(235, 192, 23, 0.3);
    white-space: nowrap;
  }
  .signup-btn:hover {
    background-color: rgba(255, 208, 25, 1);
    box-shadow: 0px 0px 15px rgba(235, 192, 23, 1);
    color: #fff;
  }

  .login-btn {
    margin: 0 0 0 1rem;
    padding: 1rem 1.5rem;
    text-align: center;
    color: #fff;
    white-space: nowrap;
    background: rgba(0, 179, 159, 1);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 179, 159, 0.3);
  }

  .login-btn:hover {
    background-color: #00d3a9;
    box-shadow: 0px 0px 15px rgba(0, 179, 159, 1);
    color: #fff;
  }
  @media screen and (max-width: 1400px) {
    img.logo {
      max-width: 320px;
    }
  }
  @media screen and (max-width: 1100px) {
    nav {
      padding: 1.5em 2.5em;
    }
  }
  @media screen and (max-width: 975px) {
    .themeToggle {
      // position: absolute;
    }
    nav {
      // padding: 1.5rem 5rem;
    }
    // .themeToggle > svg {
    //   width: 32px;
    //   height: 32px;
    // }
    img.logo {
      max-width: 320px;
    }
  }

  @media screen and (max-width: 768px) {
    img.logo {
      max-width: 250px;
    }
    .signup-btn {
      padding: 0.7rem 1rem;
      margin: auto 0.35rem;
    }
    .login-btn {
      padding: 0.7rem 1rem;
      margin: auto 0.35rem;
    }
    .themeToggle > svg {
      width: 28px;
      height: 28px;
    }
  }

  @media screen and (max-width: 615px) {
    nav {
      padding: 1.5rem;
    }

    img.logo {
      max-width: 200px;
    }
  }
  @media screen and (max-width: 500px) {
    img.logo {
      max-width: 180px;
    }
    nav {
      padding: 1.5625rem 0.625rem;
    }
    .themeToggle {
      position: static;
    }
    .signup-btn,
    .login-btn {
      padding: 5px 7px;
    }
    .themeToggle > svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Main = styled.main`
  max-width: 75%;
  margin: 5rem auto;

  ::selection {
    background: #00b39f;
    color: #FFFFFF;
  }

  p {
    font-size: 1.05rem;
    text-align: center;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  h2 {
    text-align: center;
  }
  .hero {
    p {
      text-align: center;
    }
  }
  .try-now-txt {
    margin-top: -3rem;
    margin-bottom: 1rem;
    font-weight: 300;
    text-align: center;
    font-style: italic;
  }

  .desc-text {
    margin: 0 0 3rem;
    line-height: 150%;
  }

  .embedVideo {
    height: 44vw !important;
    border-radius: 2.5%;
    transition: 0.2s ease-in-out;
    box-shadow: 0px 3px 20px 4px rgba(0, 179, 159, 0.5);

    .react-player__preview {
      border-radius: 1.5%;
    }

    .react-player__play-icon {
      transform: scale(3, 3);
    }

    iframe {
      border-radius: 2.5%;
    }

    @media (max-width: 768px) {
      height: 54vw !important;
    }

    &:hover {
      box-shadow: 0px 3px 20px 4px rgba(0, 179, 159, 0.75);
      .react-player__play-icon {
        border-color: transparent transparent transparent #ebc017 !important;
      }
    }
  }

  .caption {
    color: ${({ theme }) => theme.text};
    margin-top: 0.75rem;
    margin-left: 1.5rem;
    font-size: 1.125rem;
    font-weight: 500;
    font-style: italic;
    text-align: center;
  }

  .byline {
    margin-top: 2rem;
  }

  .form {
    margin: 4rem auto;
  }

  .join-community {
    text-align: center;
    width: 100%;

    .btn-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.5rem;
    }

    a {
      display: block;
      background: #ebc017;
      color: ${({ theme }) => theme.btn};
      width: auto;
      padding: 1rem;
      margin: auto;
      border-radius: 0.5rem;
      transition: 0.2s ease-in-out;
      &:hover {
        background-color: rgba(255, 208, 25, 1);
        box-shadow: 0px 0px 12px #ebc017;
        color: #fff;
      }
    }

    .btn-secondary {
      background-color: #00b39f;
      margin-left: 1rem;

      &:hover {
        background-color: #00b39f;
        box-shadow: 0px 0px 12px #00b39f;
        color: #fff;
      }
    }
  }

  .program-logo {
    float: left;
    margin: 1rem;
    max-width: 225px;
    width: calc(30% - 30px);
  }

  .banner-logos {
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  .banner-logos img {
    max-width: 472px;
    margin: 1.5rem 0;
  }
  .banner-logos h3 {
    font-weight: 380;
    font-size: 1.67rem;
    margin: 1rem 0;
  }
  .banner-logos h4 {
    margin: -1rem 1rem 2rem 1rem;
    font-weight: 250;
  }
  .banner-logos ul {
    margin: 0rem;
    font-weight: 150;
  }
  .banner-main {
    text-align: center;
  }
  .display-badge-steps-parent {
    display: flex;
    align-items: center;
    margin-left: 2.5rem;
  }
  .display-badge {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 1rem 8rem 1rem -10rem;
  }
  .github-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .github-badges img {
    height: 290px;
    margin: 1rem;
  }
  .faq {
    text-align: center;
    margin: 0rem auto 0rem auto;
  }
  @media screen and (max-width: 1230px) {
    .display-badge {
      margin: 0 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    figure {
      width: 90%;
    }
    max-width: 85%;
    .display-badge-steps {
      margin: 0;
    }
    .banner-logos h4 {
      margin: 1rem;
    }
  }
  @media screen and (max-width: 568px) {
    figure {
      width: 100%;
    }
    max-width: 90%;
    .banner-logos img {
      max-width: 350px;
    }
    .github-badges img {
      height: auto;
      width: 90%;
    }
  }

  @media screen and (max-width: 344px) {
    .join-community {
      a {
        width: 12rem;
      }
    }
    max-width: 95%;
  }
`;
