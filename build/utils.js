/* eslint-disable no-console */
'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  }

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    // const loaders = options.usePostCSS ? [cssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
    }

    return ['vue-style-loader'].concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: `{severity}: ${error.name}`,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    })
  }
}

exports.getNodePath = () => {
  // 去掉返回值后缀的 %0A
  const nodePath = require('child_process').execSync('npm root -g')
    .toString()
    .trim()
  const CURRENT_NODE_PATH = process.env.NODE_PATH

  // console.log('NODE_PATH:' + nodePath);

  if (!CURRENT_NODE_PATH) {
    console.log(`CURRENT_NODE_PATH:${CURRENT_NODE_PATH}`)
    console.error(`\n请设置环境变量NODE_PATH为${nodePath}`)
    // console.log('err nodePath');

    return false
  }

  const arrNodePath = CURRENT_NODE_PATH.split(process.platform.indexOf('win') === 0 ? ';' : ':')

  if (arrNodePath.indexOf(nodePath) === -1) {
    console.log(`CURRENT_NODE_PATH:${CURRENT_NODE_PATH}`)
    console.error(`\n请设置环境变量NODE_PATH为${nodePath}`)
    // console.log('err nodePath')

    return false
  }

  return nodePath
}
