/**
 * 设置标题
 *
 * @Author: songshipeng
 * @Date: 2019-03-19 11:22:07
 * @Email: songship1221@sina.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2019-03-29 14:35:10
 */

// import Dom from '../dom'

export default (title) => {
  // 以下代码可以解决以上问题，不依赖jq
  setTimeout(function () {
  // 利用iframe的onload事件刷新页面
    document.title = title
    let iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe)
        iframe = undefined
      }, 0)
    }
    document.body.appendChild(iframe)
  }, 0)
}
