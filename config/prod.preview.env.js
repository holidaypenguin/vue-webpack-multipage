'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// process.env.RUN_ENV
module.exports = merge(prodEnv, {
  publicPath: '"/"',
})
