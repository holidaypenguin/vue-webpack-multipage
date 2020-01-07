/* eslint-disable max-len */
/* eslint-disable no-console */
/**
 * 多页面支持
 * @File:
 * @Description: 多页面支持
 * @author qingyi xuelongqy@foxmail.com
 * @date 2017/6/15 10:16
 * @version V1.0
 */

const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const config = require('../config')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const DEBUG = true

let moduleList // 缓存多页面模块列表
const moduleRootPath = config.moduleRootPath // 模块根目录(这个可以根据自己的需求命名)

/**
 * 获取js入口数组
 */
exports.getEntries = function getEntries () {
  // 缓存js入口数组
  const entries = {}
  // 初始化模块列表
  this.getModuleList()
  // 变量模块列表
  moduleList.forEach(function (module) {
    if (module.moduleID !== '' && module.moduleJS !== '') {
      entries[module.moduleID] = module.moduleJS
    }
  })
  DEBUG && console.log('\n*******************************************************************************')
  DEBUG && console.log('*********************************** entries ***********************************')
  DEBUG && console.log('*******************************************************************************')
  DEBUG && console.log(Object.keys(entries).map(item => `【ENTRY】 ${item}`)
    .join('\n'))

  return entries
}

/**
 * 获取多页面模块列表
 * @returns {模块的信息集合}
 */
exports.getModuleList = function getModuleList () {
  // 判断是否为空，不为空则直接返回
  if (moduleList) {
    return moduleList
  } // 为空则读取列表
  moduleList = []
  readDirSync(moduleRootPath, '')
  moduleListFilter()

  DEBUG && console.log('\n**********************************************************************************')
  DEBUG && console.log('*********************************** moduleList ***********************************')
  DEBUG && console.log('**********************************************************************************')
  DEBUG && console.log(moduleList.map(item => `【MODULE】 ${JSON.stringify(item)}`).join('\n'))

  return moduleList
}

/**
 * 获取dev的Html模板集合
 * @returns {dev的Html模板集合}
 */
exports.getDevHtmlWebpackPluginList = function getDevHtmlWebpackPluginList () {
  DEBUG && console.log('\n************************************************************************************************')
  DEBUG && console.log('*********************************** devHtmlWebpackPluginList ***********************************')
  DEBUG && console.log('************************************************************************************************')
  // 缓存dev的Html模板集合
  const devHtmlWebpackPluginList = []
  // 获取多页面模块集合
  const moduleList = this.getModuleList()
  // 遍历生成模块的HTML模板
  moduleList.forEach(function (mod) {
    // 生成配置
    const conf = {
      filename: utils.assetsPath(`${config.moduleRootName}/${mod.moduleID}.html`),
      template: mod.moduleHTML,
      chunks: [mod.moduleID],
      inject: true,
      hash: true,
    }
    DEBUG && console.log('【CONF】', JSON.stringify(conf))
    // 添加HtmlWebpackPlugin对象
    devHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
  })

  return devHtmlWebpackPluginList
}

/**
 * 获取prod的Html模板集合
 * @returns {prod的Html模板集合}
 */
exports.getProdHtmlWebpackPluginList = function getProdHtmlWebpackPluginList () {
  DEBUG && console.log('\n*************************************************************************************************')
  DEBUG && console.log('*********************************** prodHtmlWebpackPluginList ***********************************')
  DEBUG && console.log('*************************************************************************************************')
  // 缓存dev的Html模板集合
  const prodHtmlWebpackPluginList = []
  // 获取多页面模块集合
  const moduleList = this.getModuleList()
  // 遍历生成模块的HTML模板
  moduleList.forEach(function (mod) {
    // 生成配置
    const conf = {
      filename: utils.assetsPath(`${config.moduleRootName}/${mod.moduleID}.html`),
      template: mod.moduleHTML,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: [`${mod.moduleID}-runtime`, 'chunk-libs', mod.moduleID],
    }
    DEBUG && console.log('【CONF】', JSON.stringify(conf))
    // 添加HtmlWebpackPlugin对象
    prodHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
  })

  return prodHtmlWebpackPluginList
}

/**
 * 深度遍历目录，并整理多页面模块
 * @param path 需要变量的路径
 * @param moduleName 模块名称
 */
const readDirSync = (path, moduleName) => {
  // 缓存模块对象
  const module = {
    moduleID: '',
    moduleHTML: '',
    moduleJS: '',
  }
  // 获取当前模块ID
  let moduleID = path.replace(`${moduleRootPath}/`, '')
  if (path === moduleRootPath) {
    moduleID = ''
  }
  module.moduleID = moduleID
  // 获取目录下所有文件及文件夹
  const pa = fs.readdirSync(path)
  pa.forEach(function (ele, index) {
    const info = fs.statSync(`${path}/${ele}`)
    if (info.isDirectory()) {
      // console.log('dir: '+ele)
      readDirSync(`${path}/${ele}`, ele)
    } else {
      // 判断当前模块的html是否存在
      if (`${moduleName}.html` === ele) {
        module.moduleHTML = `${path}/${ele}`
      }
      // 判断当前模块的js是否存在
      if (`${moduleName}.js` === ele) {
        module.moduleJS = `${path}/${ele}`
      }
      // console.log('file: '+ele)
    }
  })
  // 判断模块是否真实(可能只是个分级目录)
  if ((module.moduleID !== '' && module.moduleHTML !== '') || (module.moduleID !== '' && module.moduleJS !== '')) {
    module.moduleHTML = resolve(module.moduleHTML)
    module.moduleJS = resolve(module.moduleJS)
    moduleList.push(module)
  }
}

/**
 * 根据指定编译模块过滤，如果无匹配项则全部编译
 * @author songshipeng
 * @date 2019-03-07
 */
const moduleListFilter = () => {
  const currentModule = getCurrentModule()

  if (!moduleList ||
    module.length < 2 ||
    !currentModule ||
    currentModule.length < 0) {
    return moduleList
  }

  const temp = moduleList.filter(
    module => currentModule.indexOf(module.moduleID) >= 0
  )

  if (
    process.env.RUN_ENV !== 'local' &&
    config.customPublish &&
    (!temp || temp.length < 1)
  ) {
    throw new Error(`模块名称${currentModule}不存在`)
  }

  moduleList = !temp || temp.length < 1
    ? moduleList
    : temp
}

const getCurrentModule = () => {
  DEBUG && console.log(process.argv)

  const outModule = process.argv.splice(2)

  const allModule = `${outModule} ${process.env.RUN_ENV === 'local' ? config.currentModule : ''}`

  if (
    process.env.RUN_ENV !== 'local' &&
    config.customPublish &&
    (!allModule || allModule.length < 2)
  ) {
    throw new Error('没有指定模块名称')
  }

  const currentModule = allModule.replace(',', ' ').split(' ')

  return currentModule
}
