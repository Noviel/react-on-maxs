const { root } = require('../paths');

module.exports = {
  common: {
    rootPath: root,
    cssPreprocessors: ['scss'],
    emotion: true,
  },
  client: {
    entry: './src/client/index.js',
    template: './src/client/index.html',
  },
  server: {
    node: true,
    publicPath: 'dist/',
    entry: './src/server/index.js',
  },
};
