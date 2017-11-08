const { basePreset } = require('webpack-features');
const { client, common } = require('./config');

module.exports = basePreset({
  ...common,
  ...client,
  publicPath: 'dist/',
});
