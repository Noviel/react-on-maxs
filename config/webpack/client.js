const { presetReact } = require('webpack-features');
const { client, common } = require('./config');

module.exports = presetReact({
  ...common,
  ...client,
  publicPath: 'dist/',
});
