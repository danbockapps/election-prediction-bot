import * as functions from 'firebase-functions'
import { getData } from './economist'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const tweetEconomistEcProb = functions.pubsub
  .schedule('19,49 * * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    const data = await getData()
    console.log(JSON.stringify(data[data.length - 4]))
    console.log(JSON.stringify(data[data.length - 3]))
    console.log(JSON.stringify(data[data.length - 2]))
    console.log(JSON.stringify(data[data.length - 1]))
  })
