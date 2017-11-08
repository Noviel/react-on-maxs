import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './theme/theme.global.css';

import App from './components/App';

import('./lib')
  .then(({ exclame }) => {
    console.log(`${exclame(process.env.HELLO)} [${process.env.NODE_ENV}]`);
  })
  .catch(e => {
    console.log(e);
  });

const rootElement = document.getElementById('app');

const hotRender = element => {
  render(<AppContainer>{element}</AppContainer>, rootElement);
};

const hotRenderApp = () => hotRender(<App caption="client side data" />);

if (window.ssr) {
  console.log('Got SSR data:', window.ssrData);
  hydrate(<App caption={window.ssrData} />, rootElement);
} else {
  console.log('No SSR data, assuming you are in dev env');
  hotRenderApp();

  if (module.hot) {
    module.hot.accept('./components/App', hotRenderApp());
  }
}
