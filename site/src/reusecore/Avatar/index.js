import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  background-color: ${props => props.backgroundColor || '#ccc'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const AvatarText = styled.span`
  color: ${props => props.textColor || '#fff'};
  font-size: 16px;
  font-weight: bold;
`;

const Avatar = ({ src, initials, size, backgroundColor, textColor }) => {
  return (
    <AvatarContainer size={size} backgroundColor={backgroundColor}>
      {src ? (
        <img src={src} alt="User Avatar" />
      ) : (
        <AvatarText textColor={textColor}>{initials}</AvatarText>
      )}
    </AvatarContainer>
  );
};

export default Avatar;
