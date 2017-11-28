const { presetReact } = require('webpack-features');
const { server, common } = require('./config');

module.exports = presetReact({ ...common, ...server });
