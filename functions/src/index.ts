import * as functions from 'firebase-functions'
import { tweetEcProb } from './economist'

export const tweetEconomistEcProb = functions.pubsub
  .schedule('0,30 * * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    await tweetEcProb()
  })
