import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #00b39f;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  color: #fff;

  h1 {
    font-size: 4rem;
    font-weight: bold;
    padding: 8px;
    color: #fff;
  }
  p {
    font-size: 24px;
    color: #f5f5f5;
  }
  a {
    font-size: 16px;
    color: #f4f4f4;
  }
  a:hover {
    color: #fff;
  }
`;
const Header = () => {
  return (
    <StyledHeader>
      <h1>Hello 👋</h1>
      <p>Welcome to Layer5 leaderboard.</p>
      <section>
        <a
          className="p-1"
          href="https://discuss.layer5.io"
          target="_blank"
          rel="noreferrer"
        >
          Discussion Forum &#8599;
        </a>
      </section>
    </StyledHeader>
  );
};

export default Header;
