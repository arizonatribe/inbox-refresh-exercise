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
