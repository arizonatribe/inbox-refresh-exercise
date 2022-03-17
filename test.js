const delay = require("./delay")
const throttle = require("./throttle")
const createFetcher = require("./fetch")

const fetchInboxContent = createFetcher()

async function simulateClicks(timeoutMs = 2000) {
    const refreshInbox = throttle(fetchInboxContent, timeoutMs)

    console.log("0s: click() -> server is called")
    refreshInbox()

    await delay(500)
    console.log(".5s: click -> we throttle")
    refreshInbox()

    await delay(500)
    console.log("1s: click -> we throttle")
    refreshInbox()

    await delay(1000)
    // Modify to make sure that this is throttled
    // console.log("2s: -> server is called")
    console.log("2s: -> (no timeout; start one)")
    refreshInbox()

    await delay(1000)
    console.log("3s: click() -> we throttle")
    refreshInbox()

    await delay(1000)
    console.log("4s: -> server is called (after delay)")
    refreshInbox()
}

simulateClicks()
