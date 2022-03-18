# Summary

Backend engineers ask for the WebApp to limit the number of `fetchInboxContent()` calls from the WebApp
to the server, as logging shows that users click the __Refresh__ button multiple times in short bursts (e.g. 5 clicks in a span of .5 second).

How can we achieve this?

## Follow-up Modification

During the exercise it was requested to modify the behavior so that only the initial fetch call executes immediately, and that throttling affects all subsequent calls (even if no timeout is currently in progress).

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

## Afterparty Modification

Although the "pristine check" met the follow-up requirement, I don't think I'd personally ship that to production if I were tasked with the whole refresh throttling feature. Instead I would have the feature make an immediate fetch as long as a timeout isn't in progress.

Essentially:

- If no timeout is in progress, make the fetch call _and_ create a "noop" timeout (one which will not make a fetch call when it elapses)
- If a timeout _is_ in progress, clear it (because we have to assume it may make a fetch call when finished) and replace it with a timeout which _will_ execute another fetch call when done

Here's an output summary (from running `node test_revised.js`)

```
0s: click() ->
 server is called

  refreshing inbox (time #1)

2.5s: click() ->
 server is called immediate (no timeouts in progress)

  refreshing inbox (time #2)

3s: click() ->
 we throttle (because a timeout is in progress)

  Canceling delayed call and creating a new delayed call

4s: click() ->
 we throttle again (but server is called after timeout elapses)

  Canceling delayed call and creating a new delayed call

  refreshing inbox (time #3)
```
