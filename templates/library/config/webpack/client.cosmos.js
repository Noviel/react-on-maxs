const { presetReact } = require('webpack-features');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = presetReact(
  {
    ...config,
    library: false,
    template: false,
    production: false,
    hot: false,
    defines: {
      HELLO: 'YPYPYPYPYPYP',
    },
  },
  {
    plugins: [new HtmlWebpackPlugin()],
  }
);
