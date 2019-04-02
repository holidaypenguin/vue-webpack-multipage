/**
 * 拦截器
 *
 * @Author: songshipeng
 * @Date: 2019-03-18 15:14:28
 * @Email: songship1221@sina.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2019-04-02 10:39:10
 */

import axios from 'axios'

export default (router) => {
  const install = Vue => {
    if (install.installed) return

    const $axios = axios.create()

    // 添加一个请求拦截器
    $axios.interceptors.request.use(function (config) {
      // 在请求发送之前做一些事
      // console.info("[request] [success]", config);
      return config
    }, function (error) {
      // 当出现请求错误是做一些事
      // console.info("[request] [ error ]", error);
      return showError(error, '当前请求存在问题')
    })

    // 添加一个返回拦截器
    $axios.interceptors.response.use(function (response) {
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

          if (json.meta) {
            const errno = json.meta.status || json.meta.errno

            const msg = json.meta.msg

            response.data.errno = errno
            response.data.msg = msg
            if (response.data.result) {
              if (response.data.result.current_page) {
                response.data.currentPage = response.data.result.current_page
              }

              if (response.data.result.page_size) {
                response.data.pageSize = response.data.result.page_size
              }

              if (response.data.result.page) {
                if (response.data.result.page.totalRecord) {
                  response.data.result.page.total = response.data.result.page.totalRecord
                }
              }
            }

            // eslint-disable-next-line no-empty
            if (Number(errno) === 0) {

            } else if (/^\d{4}401$/.test(errno)) { // TODO登录失效
              const closehandler = (function () {
                return function () {
                  // router.push({name: 'login'})
                }
              })()

              return showError(response, msg, closehandler)
            } else if (errno === 401) { // TODO 未知东西
              // response.ok = false;
            } else {
              return showError(response, msg)
            }
          }

          break
        default:
          return showError(response, `当前网络存在问题【${response.statusText}】`)
      }

      return response
    }, function (error) {
      // 对返回的错误进行一些处理
      // console.info("[response] [ error ]", error);

      // Vue.prototype.yiiLoading.hide()

      return showError(error.response, '请求失败，请重试')
    })

    Vue.prototype.$axios = $axios

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
