const { presetReact } = require('webpack-features');

const config = require('./config');

module.exports = presetReact(config);
