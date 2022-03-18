const delay = require("./delay")
const throttle = require("./throttle_revised")
const createFetcher = require("./fetch")

const fetchInboxContent = createFetcher()

async function simulateClicks(timeoutMs = 2000) {
    const refreshInbox = throttle(fetchInboxContent, timeoutMs)

    console.log("0s: click() ->\n server is called")
    refreshInbox()

    await delay(2500)
    console.log("2.5s: click() ->\n server is called immediate (no timeouts in progress)")
    refreshInbox()

    await delay(500)
    console.log("3s: click() ->\n we throttle (because a timeout is in progress)")
    refreshInbox()

    await delay(1000)
    console.log("4s: click() ->\n we throttle again (but server is called after timeout elapses)")
    refreshInbox()
}


simulateClicks()

