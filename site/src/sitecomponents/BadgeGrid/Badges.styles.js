import styled from "styled-components";
export const BadgesWrapper = styled.div`
  div.badge-grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      max-width: 20%;
      margin: 1rem;
      align-items: center;
      > span {
        text-align: center;
        font-weight: 600;
        margin-bottom: 0.3125rem;
        font-size: 1.3125rem;
        color: ${({ theme }) => theme.text};
      }
      > img {
        max-width: 250px;
        min-height: 360px;
        object-fit: contain;
      }
      .badge-label {
        font-family: 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
        position: relative;
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        background: linear-gradient(135deg, #00b39f 0%, #00d3aa 100%);
        color: #ffffff;
        padding: 0.35rem 0.9rem 0.35rem 1.25rem;
        border-radius: 0 0.75rem 0.75rem 0;
        font-size: 0.72em;
        letter-spacing: 0.6px;
        margin-top: 0.5rem;
        font-weight: 600;
        text-transform: uppercase;
        box-shadow: 0 4px 12px rgba(0, 179, 159, 0.25);
      }

      .badge-label::before {
        content: '';
        position: absolute;
        top: 0;
        left: -0.75rem;
        width: 0.75rem;
        height: 100%;
        background: linear-gradient(135deg, #009783 0%, #00b39f 100%);
        clip-path: polygon(0 0, 100% 0, 0 100%);
      }

      .badge-label::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 0 0.75rem 0.75rem 0;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
        pointer-events: none;
      }
    }

  }  
  @media (max-width: 1250px) {
    div.badge-grid > div {
      max-width: 25%;
    }
  }
  @media (max-width: 992px) {
    div.badge-grid > div {
      max-width: 45%;
    }
  }
  @media (max-width: 670px) {
    div.badge-grid > div {
      max-width: 95%;
    }
  }
`;

const Badges = styled.section`
  padding: 3.1rem 0 3.1rem 0;
  background: #222;

  .container{
      display: flex;
      margin: auto;
      width: 60%;
  }

  .footer-links {
    width: 100%;
    margin: 1rem;
    padding: 0;
  
    li {
      list-style: none;
      margin: 0.75rem 0.75rem 0.75rem 0.125rem;
  
      a {
        &:hover {
          text-decoration: none;
          color: white;
        }
        img {
          margin-right: 10px;
          transition: fill 0.2s ease;
          vertical-align: middle;
          position: relative;
          top: -2px;
          width: 22px;
          height: 22px;
          filter: invert(0.75) grayscale(1);
        }

        &:hover {
          img {
            filter: invert(0);
          }
        }
      }
    }
  }

  .socials {
    flex: 0 0 15%;
  }

  @media screen and (max-width: 1400px) {
    .community, .getting-started, .resources, .socials {
      flex: 0 0 22%;
    }
  }

  @media screen and (max-width: 992px) {
    .container {
      flex-wrap: wrap;
      width: 75%;
    }
    .community, .getting-started, .resources, .socials {
      flex: 0 0 30%;
      margin: 1rem 1rem 1rem 5rem;
    }
  }

  @media screen and (max-width: 650px) {
    .container {
      flex-wrap: wrap;
      width: 90%;
    }
    .community, .getting-started, .resources, .socials {
      flex: 0 0 30%;
      margin: 1rem 1rem 1rem 4rem;
    }
  }

  @media screen and (max-width: 450px) {
    .container {
      flex-wrap: wrap;
      width: 90%;
    }
    .community, .getting-started, .resources, .socials {
      flex: 0 0 100%;
      margin: 1rem 0;
      text-align: center;
    }
  }

  .copyright {
    font-size: 0.9rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #3C494F;
    display: flex;
    justify-content:space-evenly;
    text-align:center;
    @media (max-width:1000px) {
      flex-direction: column;
      text-align: center;
      .text{
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  }
  
  .meshery-footer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: auto;

    img {
      width: 120px;
      height: 30px;
    }
  }
  
  &, a {
    color: #999;
  }

  a {
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }

  .section-title{
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.8);

    .title-link {
        transition: 0.2s all;
        color: rgba(255, 255, 255, 0.75);
        &:hover {
            color: #fff;
        }
    }
  }

  .section-categories {
    padding: 0;
    list-style: none;
    margin: 0;
    font-size: 0.9rem;

    .category-link {
      color: rgba(255, 255, 255, 0.5);
      transition: 0.2s all;
    }
  }
`;

export {Badges};
export default BadgesWrapper;
