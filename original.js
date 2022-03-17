// Gmail backend engineers ask for the WebApp to limit the number of “fetchInboxContent()” calls from the WebApp
// to the server, as logging shows that users click the “Refresh” button multiple times in short bursts
// (e.g. 5 clicks in a span of .5 second). How can we achieve this?
 
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
      clearTimeout(timeout)
    }
      
    timeout = setTimeout(() => {
      if (isPristine) {
        timeout = null
        isPristine = false
      } else {
        fn().then(() => {
          timeout = null
        })
      }
    }, timeoutMs)
  }
}

function fetchInboxContent() {
  // call backend and update UI
}

getElementById("refresh-button").onClick = throttle(fetchInboxContent, 2000 /* ms */)


// From Lodash/Underscore (for comparison
// Creates and returns a new, throttled version of the passed function, that, when
// invoked repeatedly, will only actually call the original function at most once
// per every wait milliseconds. Useful for rate-limiting events that occur faster
// than you can keep up with.
//
// By default, throttle will execute the function as soon as you call it for the
// first time, and, if you call it again any number of times during the wait
// period, as soon as that period is over.
function throttle(func, wait)

// timeoutMs = 2000

// 0s: click() -> server is called

// .5s: click -> we throttle
// 1s: click -> we throttle

// 2s: -> server is called

// 3s: click() -> we throttle

// 4s: -> server is called
