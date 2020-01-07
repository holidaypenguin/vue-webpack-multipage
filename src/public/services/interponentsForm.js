
/**
 * 拦截器
 *
 * @Author: songshipeng
 * @Date: 2019-03-18 15:14:28
 * @Email: songshipeng@rongyi.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2019-11-25 21:26:40
 */

import axios from 'axios'

export default () => {
  const install = Vue => {
    if (install.installed) return

    const $axiosForm = axios.create()

    // 添加一个请求拦截器
    $axiosForm.interceptors.request.use(function (config) {
      // 在请求发送之前做一些事
      // console.info("[request] [success]", config);
      if (config.data) {
        const formData = new FormData()

        Object.keys(config.data).map(key => {
          formData.append(key, config.data[key])
        })
        config.data = formData
      }

      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

      return config
    }, function (error) {
      // 当出现请求错误是做一些事
      // console.info("[request] [ error ]", error);
      return showError(error, '当前请求存在问题')
    })

    // 添加一个返回拦截器
    $axiosForm.interceptors.response.use(function (response) {
      // 对返回的数据进行一些处理
      // console.info("[response] [success]", response);

      if (!response) {
        return showError(response, '当前请求存在问题')
      }

      // Vue.prototype.yiiLoading.hide()

      switch (parseInt(response.status, 10)) {
        case -1:
        case 404:
          return showError(response, '请求失败，请重试')
        case 200:
          // eslint-disable-next-line no-case-declarations
          const json = response.data

          // eslint-disable-next-line no-case-declarations
          const {code, msg} = json

          // eslint-disable-next-line no-empty
          if (Number(code) === 0) {
            return Promise.resolve(json)
          } else if (/^\d{4}401$/.test(code)) { // TODO登录失效
            return showError(response, msg)
          }

          return showError(response, msg)

        default:
          return showError(response, `当前网络存在问题【${response.statusText}】`)
      }
    }, function (error) {
      // 对返回的错误进行一些处理
      // console.info("[response] [ error ]", error);

      // Vue.prototype.yiiLoading.hide()

      return showError(error.response, '请求失败，请重试')
    })

    Vue.prototype.$axiosForm = $axiosForm

    install.installed = true
  }

  return {install}
}

const showError = (response, msg, callback) => {
  // msg && Vue.prototype.yiiTips({
  //   type: 'error',
  //   message: msg,
  //   closehandler: callback,
  // })

  return Promise.reject(response)
}
