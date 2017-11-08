const { basePreset } = require('webpack-features');
const { client, common } = require('./config');

module.exports = basePreset({
  ...common,
  ...client,
  production: false,
  hot: true,
  defines: {
    HELLO: 'YPYPYPYPYPYP',
  },
});
