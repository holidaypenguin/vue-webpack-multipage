/**
 * 从url上获取参数
 *
 * @Author: songshipeng
 * @Date: 2019-03-19 11:00:11
 * @Email: songship1221@sina.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2019-03-19 11:16:10
 */

/**
 * 循环匹配一个?或者&
 * 接着至少匹配一个非?或者非&
 * 接着一个等号
 * 接着至少匹配一个非?或者非&
 *
 * 循环匹配后将key和value保存到一个对象中并返回，也可以保存在Map中
 */
export const getQueryString = (name, url) => {
  if (name) {
    const _url = url ? new URL(url) : window.location
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = _url.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])

    return null
  }

  const _url = url || window.location.href
  const params = {}

  _url.replace(/[?&]([^?&]+)=([^?&]+)/g, function ($0, $1, $2, $3) {
    params[$1] = $2
  })

  return params
}
