
const EnumFormate = (value, target, valueKey = 'value', labelKey = 'label') => {
  if (value === undefined || value === null || !target) return value

  if (Array.isArray(target)) {
    let tempObj
    if (valueKey && labelKey) {
      tempObj = target.find(item => item[valueKey] === value)
    } else if (labelKey) {
      tempObj = target[value]
    }

    return tempObj ? tempObj[labelKey] : value
  } else if (Object.prototype.toString.call(target) === '[object Object]') {
    return labelKey === undefined ? target[value] : target[value][labelKey]
  }

  return value
}

EnumFormate.install = Vue => {
  Vue.filter('enum', EnumFormate)
}

export default EnumFormate
