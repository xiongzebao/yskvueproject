var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
require('babel-polyfill');
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
