/**
 * 来源
 *
 * @Author: songshipeng
 * @Date: 2020-01-07 11:47:56
 * @Email: songshi1221@sina.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2020-01-07 11:47:56
 */

export const SOURCE_WECHAT = 0
export const SOURCE_ALIPAY = 1

export const getSource = function getSource () {
  const agent = navigator.userAgent.toLocaleLowerCase()
  if (agent.indexOf('micromessenger') > 0) return SOURCE_WECHAT

  if (agent.indexOf('alipayclient') > 0) return SOURCE_ALIPAY

  return SOURCE_ALIPAY
}
