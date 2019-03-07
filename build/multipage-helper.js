/**
 * 多页面支持
 * @File:
 * @Description: 多页面支持
 * @author qingyi xuelongqy@foxmail.com
 * @date 2017/6/15 10:16
 * @version V1.0
 */

const path = require('path')
const fs = require("fs")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const config = require('../config')

let moduleList          //缓存多页面模块列表
const moduleRootPath = config.moduleRootPath //模块根目录(这个可以根据自己的需求命名)

console.log(process.argv);

/**
 * 获取js入口数组
 */
exports.getEntries = function getEntries(){
  //缓存js入口数组
  var entries = {}
  //初始化模块列表
  this.getModuleList()
  //变量模块列表
  moduleList.forEach(function (module) {
    if (module.moduleID != "" && module.moduleJS != ""){
      entries[module.moduleID] = module.moduleJS
    }
  })
  console.log("\n*******************************************************************************")
  console.log("*********************************** entries ***********************************")
  console.log("*******************************************************************************")
  console.log(Object.keys(entries).map(item => "【ENTRY】 " + item).join('\n'))
  return entries
}

/**
 * 获取多页面模块列表
 * @returns {模块的信息集合}
 */
exports.getModuleList = function getModuleList() {
  //判断是否为空，不为空则直接返回
  if (moduleList){
    return moduleList
  }else {//为空则读取列表
    moduleList = new Array();
    readDirSync(moduleRootPath, "")

    console.log("\n**********************************************************************************")
    console.log("*********************************** moduleList ***********************************")
    console.log("**********************************************************************************")
    console.log(moduleList.map(item => "【MODULE】 " + JSON.stringify(item)).join('\n'))
    return moduleList
  }
}

/**
 * 获取dev的Html模板集合
 * @returns {dev的Html模板集合}
 */
exports.getDevHtmlWebpackPluginList = function getDevHtmlWebpackPluginList(){
  console.log("\n************************************************************************************************")
  console.log("*********************************** devHtmlWebpackPluginList ***********************************")
  console.log("************************************************************************************************")
  //缓存dev的Html模板集合
  var devHtmlWebpackPluginList = []
  //获取多页面模块集合
  var moduleList = this.getModuleList()
  //遍历生成模块的HTML模板
  moduleList.forEach(function (mod) {
    //生成配置
    var conf = {
      filename: utils.assetsPath(config.moduleRootName+"/"+mod.moduleID+".html"),
      template: mod.moduleHTML,
      chunks: [mod.moduleID],
      inject: true,
      hash: true,
    }
    console.log("【CONF】",JSON.stringify(conf))
    //添加HtmlWebpackPlugin对象
    devHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
  })
  return devHtmlWebpackPluginList
}

/**
 * 获取prod的Html模板集合
 * @returns {prod的Html模板集合}
 */
exports.getProdHtmlWebpackPluginList = function getProdHtmlWebpackPluginList(){
  console.log("\n*************************************************************************************************")
  console.log("*********************************** prodHtmlWebpackPluginList ***********************************")
  console.log("*************************************************************************************************")
  //缓存dev的Html模板集合
  var prodHtmlWebpackPluginList = []
  //获取多页面模块集合
  var moduleList = this.getModuleList()
  //遍历生成模块的HTML模板
  moduleList.forEach(function (mod) {
    //生成配置
    var conf = {
      filename: utils.assetsPath(config.moduleRootName + "/"+mod.moduleID+".html"),
      template: mod.moduleHTML,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','vendor',mod.moduleID]
    }
    console.log("【CONF】",JSON.stringify(conf))
    //添加HtmlWebpackPlugin对象
    prodHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
  })
  return prodHtmlWebpackPluginList
}

/**
 * 深度遍历目录，并整理多页面模块
 * @param path 需要变量的路径
 * @param moduleName 模块名称
 */
function readDirSync(path,moduleName){
  //缓存模块对象
  var module = {moduleID:"",moduleHTML:"",moduleJS:""}
  //获取当前模块ID
  var moduleID = path.replace(moduleRootPath+"/","")
  if (path == moduleRootPath){
    moduleID = ""
  }
  module.moduleID = moduleID
  //获取目录下所有文件及文件夹
  var pa = fs.readdirSync(path)
  pa.forEach(function(ele,index){
    var info = fs.statSync(path+"/"+ele)
    if(info.isDirectory()){
      // console.log("dir: "+ele)
      readDirSync(path+"/"+ele, ele)
    }else{
      //判断当前模块的html是否存在
      if (moduleName+".html" == ele){
        module.moduleHTML = path+"/"+ele
      }
      //判断当前模块的js是否存在
      if (moduleName+".js" == ele){
        module.moduleJS = path+"/"+ele
      }
      // console.log("file: "+ele)
    }
  })
  //判断模块是否真实(可能只是个分级目录)
  if ((module.moduleID != "" && module.moduleHTML != "") || (module.moduleID != "" && module.moduleJS != "")){
    moduleList.push(module)
  }
}
