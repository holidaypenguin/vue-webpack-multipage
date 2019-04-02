
import DateFormate from './dateformate'
import EnumFormate from './enumformate'

const Filters = [
  DateFormate,
  EnumFormate,
]

const install = Vue => {
  if (install.installed) return

  Object.keys(Filters).forEach(key => Filters[key].install(Vue))

  install.installed = true
}

export default {
  install,
  ...Filters,
}
