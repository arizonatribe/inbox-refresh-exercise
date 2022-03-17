const mockData = {
    1: 0,
    3: [{
        1: {
            1: "Sign up for a membership",
            2: "If you like cool stuff you can have lots of cool stuff if you become a member!",
            3: "1647538092163"
        }
    }],
    4: 0,
    5: "10175813",
    6: 0,
    12: {
        1: 3,
        2: 13
    },
    19: {
        1: "10132958"
    }
}

async function realFetch(url, body) {
    const response = await fetch(url, {
        method: body == null ? "get" : "post",
        ...(body && {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        }),
    })

    if (/text|html|plain/.test(response.headers.get("content-type"))) {
        return response.text()
    }

    return response.json()
}

async function pseudoFetch() {
    return new Promise(resolve => resolve(mockData))
}

function createInboxFetcher(url = "") {
    let callCount = 0

    // call backend and update UI
    return async function fetchInboxContent() {
        callCount++

        console.log(`
  refreshing inbox (time #${callCount})
        `)

        return url
            ? realFetch(url)
            : pseudoFetch()
    }
}

module.exports = createInboxFetcher
