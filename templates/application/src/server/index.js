import express from 'express';
import React from 'react';

import { server } from '../../config';
import { client } from '../../config/paths';
import renderHtml from './render-html';

import App from '../client/components/App';

const { host, port } = server;

// process.env.NODE_ENV will be replaced by Webpack in the build process.
// only NODE_ENVs inside `node_modules` will not be replaced by Webpack
// if you want set NODE_ENV for your code in a runtime, you can set
//`define({ NODE_ENV: false })` in `config/webpack/webpack.config.server.js`
const DEV = process.env.NODE_ENV !== 'production';
const HOT = process.env.HOT === 'true';
const indexFile = `${HOT ? 'dist/' : ''}index.html`;

const template = HOT
  ? 'SSR is not supported with hot client reloading...'
  : require('fs').readFileSync(`./static/${indexFile}`, 'utf8');

const start = () => {
  const app = express();

  if (HOT) {
    const webpack = require('webpack');

    const webpackConfig = require('../../config/webpack/client.hot');
    const compiler = webpack(webpackConfig);

    app.use(
      require('webpack-dev-middleware')(compiler, {
        hot: true,
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
          modules: false,
          colors: true,
          children: false,
        },
      })
    );
    app.use(require('webpack-hot-middleware')(compiler));

    app.get('/', (req, res) => {
      res.sendFile(indexFile, { root: client.assets });
    });
  } else {
    app.get('/', (req, res) => {
      const data = '$3X';
      res.send(
        renderHtml({
          template,
          app: <App caption={data} />,
          data: JSON.stringify(data),
        })
      );
    });
  }

  app.use(express.static('static'));

  app.listen(port, host, () => {
    const dev = DEV ? '[DEV]' : '';
    const hot = HOT ? '[HOT]' : '';
    console.log(`Web server started on ${host}:${port} ${dev} ${hot}`);
  });
};

start();
