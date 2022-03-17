function delay(delayMs = 200) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve()
      }, delayMs)
  })
}

module.exports = delay
module.exports.delay = delay
