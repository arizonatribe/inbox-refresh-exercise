function throttle(fn, timeoutMs) {
  let timeout
  let isPristine = true
  
  return (event) => {
    if (!timeout) {
      if (isPristine) {
        fn()
      }
    } else {
      isPristine = false
      console.log(`
  Canceling delayed call and creating a new delayed call
      `)
      clearTimeout(timeout)
    }
      
    timeout = setTimeout(() => {
      if (isPristine) {
        timeout = null
        isPristine = false
      } else {
        fn()
        timeout = null
      }
    }, timeoutMs)
  }
}

module.exports = throttle
module.exports.throttle = throttle
