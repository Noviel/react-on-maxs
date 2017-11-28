const { root } = require('../paths');

module.exports = {
  rootPath: root,
  publicPath: './',
  distPath: 'dist',
  cssPreprocessor: 'scss',
  emotion: true,
  entry: './src/index.js',
  template: false,
  library: 'dqnt-ui-kit',
};
