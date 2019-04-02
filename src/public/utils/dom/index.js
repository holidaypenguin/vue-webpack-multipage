
const on = (() => {
  if (document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }

  return (element, event, handler) => {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler)
    }
  }
})()

const off = (() => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }

  return (element, event, handler) => {
    if (element && event) {
      element.detachEvent(`on${event}`, handler)
    }
  }
})()

export default {
  on,
  off,
}
