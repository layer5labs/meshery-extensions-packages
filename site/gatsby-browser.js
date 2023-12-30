import React from 'react';
import RootElement from './src/pages/root';

export const onInitialClientRender = () => {
  setTimeout(function () {
    const loader = document.getElementById('___loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }, 1000);
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};
