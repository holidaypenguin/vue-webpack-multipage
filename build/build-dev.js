const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.dev.conf')
const opn = require('opn')
const config = require('../config')
const multipageHelper = require('./multipage-helper')

const firstModule = multipageHelper.getModuleList()[0] || {}

webpackConfig.then((_config) => {
  const compiler = Webpack(_config)
  const devServerOptions = Object.assign({}, _config.devServer, {
    stats: {
      colors: true,
    },
    inline: true,
    openPage: `/${config.produceName}/${config.moduleRootName}/${firstModule.moduleID}`,
    progress: true,
  })

  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(_config.devServer.port, _config.devServer.host, () => {
    opn(`http://${
      _config.devServer.host
    }:${
      _config.devServer.port
    }/${config.produceName}/${config.moduleRootName}/${firstModule.moduleID}`)
  })
})
