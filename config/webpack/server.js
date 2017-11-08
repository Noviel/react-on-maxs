const { basePreset } = require('webpack-features');
const { server, common } = require('./config');

module.exports = basePreset({ ...common, ...server });
