/**
 * 日期格式化
 *
 * @Author: songshipeng
 * @Date: 2019-03-18 15:29:58
 * @Email: songshipeng@rongyi.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2019-05-10 18:24:51
 */

Object.assign(Date.prototype, {
  // eslint-disable-next-line object-shorthand
  Format: function (fmt) {
    const o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds(), // 毫秒
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
    }

    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (RegExp.$1.length === 1)
            ? (o[k])
            : ((`00${o[k]}`).substr((`${o[k]}`).length))
        )
      }
    }

    return fmt
  },
})

export const DateFormate = (value, formate = 'yyyy-MM-dd') => {
  if (!value) return value

  const temp = new Date(value)

  if (temp.toString() === 'Invalid Date') return value

  return temp.Format(formate)
}

export const DateTimeFormate = (value, formate = 'yyyy-MM-dd hh:mm:ss') => {
  return DateFormate(value, formate)
}

export const TimeFormate = (value, formate = 'hh:mm:ss') => {
  return DateFormate(value, formate)
}
