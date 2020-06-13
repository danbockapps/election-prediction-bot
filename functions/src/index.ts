import * as functions from 'firebase-functions'
import { getAndSave } from './economist'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const tweetEconomistEcProb = functions.pubsub
  .schedule('0,30 * * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    await getAndSave()
  })
