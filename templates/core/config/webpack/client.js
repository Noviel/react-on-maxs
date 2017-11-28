const { presetReact } = require('webpack-features');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const { client, common } = require('./config');

module.exports = presetReact(
  {
    ...common,
    ...client,
    publicPath: 'dist/',
  },
  {
    plugins: [
      new PreloadWebpackPlugin({
        include: 'all',
      }),
    ],
  }
);
