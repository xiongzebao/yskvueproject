var merge = require('webpack-merge')
var devEnv = require('./dev.env')
require('babel-polyfill');
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
