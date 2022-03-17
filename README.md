# Summary

Gmail backend engineers ask for the WebApp to limit the number of `fetchInboxContent()` calls from the WebApp
to the server, as logging shows that users click the __Refresh__ button multiple times in short bursts (e.g. 5 clicks in a span of .5 second).

How can we achieve this?

## Follow-up Modification

Ensure that the first call causes a refresh to occur, but that ensuing calls do _not_ cancel that original call.

However, after the _first_ call is made, it is okay to have each follow-up call delay the refresh call until the rapid clicking has ceased.

So should end up with just 2 calls made (rather than 7).

## Test

```
node test.js
```

## Results

The output for the test should demonstrate the following:
- The initial click caused a call to be made immediately
- The 2nd click does _not_ cancel the original call and _does_ queue up a 2nd delayed refresh
- The 3rd, 4th, 5th, and 6th clicks each cause a canceling of the delayed refresh (since they occur within the 2second delay)
- After the 6th (final) click triggers its own a 2second delay, the 2nd refresh occurs)

```

0s: click() -> server is called

  refreshing inbox (time #1)

.5s: click -> we throttle

  Canceling delayed call and creating a new delayed call

1s: click -> we throttle

  Canceling delayed call and creating a new delayed call

2s: -> (no timeout; start one)

  Canceling delayed call and creating a new delayed call

3s: click() -> we throttle

  Canceling delayed call and creating a new delayed call

4s: -> server is called (after delay)

  Canceling delayed call and creating a new delayed call


  refreshing inbox (time #2)

```
