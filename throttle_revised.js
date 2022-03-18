/**
 * Thinking more about good UX, I don't think I'd personally like the "throttle only if not the first time".
 * Rather I'd personally prefer to throttle only if a call is already in place.
 * This modification (post exercise) is what I'd feel most comfortable shipping to production if I were tasked with it.
 */
function throttle(fn, timeoutMs) {
  let timeout
  
  return (event) => {
    if (!timeout) {
      fn()

      /*
       * This is a timeout whose sole purpose is to ensure
       * a follow-up click doesn't trigger an immediate fetch.
       * However if a reasonable time has elapsed, the timeout won't exist.
       * Therefore it'll be okay to do an immediate fetch once again.
       */
      timeout = setTimeout(() => {
        timeout = null
      }, timeoutMs)
    } else {
      /*
       * If we'eve gotten here it means the refresh has been triggered before the timeoutMs has elapsed.
       * So it's important to debounce any rapid "rage clicking"
       * and not over-burden the backend service.
       */

      console.log(`
  Canceling delayed call and creating a new delayed call
      `)

      /*
       * Have to ensure that any delayed fetch is canceled,
       * essentially replacing whatever is queued up with a new one
       */
      clearTimeout(timeout)

      /*
       * We'll still honor the request to refetch,
       * but after the threshold (in milliseconds) has been reached.
       */
      timeout = setTimeout(() => {
        fn()
        timeout = null
      }, timeoutMs)
    }
  }
}

module.exports = throttle
module.exports.throttle = throttle
