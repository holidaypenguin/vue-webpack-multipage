'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const {VueLoaderPlugin} = require('vue-loader')
// 引入多页面支持
const multipageHelper = require('./multipage-helper')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const match = () => {
  const modules = multipageHelper.getModuleList().map(item => item.moduleID)
    .join('|')

  // from: /^\/pos\/module\/(index|about)/,
  return new RegExp(`^/${config.produceName}/${config.moduleRootName}/(${modules})`)
}

// /^\/(pos)(.*)/
const toRegExp = new RegExp(`^/(${config.produceName})(.*)`)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
    }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: match(),
          to: (content) => {
            // match();
            const from = content.match[0]
            const to = from.replace(toRegExp, `/$1${config.produceNameSuffix}$2.html`)
            // eslint-disable-next-line no-console
            console.log('From:', from)
            // eslint-disable-next-line no-console
            console.log('  To:', to)
            const realTo = path.posix.join(config.dev.assetsPublicPath, to)

            return realTo
          },
        },
        {
          from: /.*/,
          to: path.posix.join(
            config.dev.assetsPublicPath,
            `${config.produceName}${config.produceNameSuffix}/${config.moduleRootName}/index.html`
          ),
        },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': Object.assign({}, require('../config/dev.env'), {
        RUN_ENV: `"${process.env.RUN_ENV}"`,
      }),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],
})

// 添加Html模板集合
Array.prototype.push.apply(devWebpackConfig.plugins, multipageHelper.getDevHtmlWebpackPluginList())

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages:
            [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined,
      }))

      resolve(devWebpackConfig)
    }
  })
})
