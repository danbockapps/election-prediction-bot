/*
Private key file located at
functions/election-prediction-bot-firebase-adminsdk-c2ty1-de2c7a849e.json
was generated in Firebase Console settings.

Run this command to make it work locally:
export GOOGLE_APPLICATION_CREDENTIALS="/Users/danbock/code/election-prediction-bot/functions/election-prediction-bot-firebase-adminsdk-c2ty1-de2c7a849e.json"
*/

import * as admin from 'firebase-admin'
import { EcProbDataPoint } from './economist'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
})

const db = admin.firestore()

const ECONOMIST_EC_PROB = 'EconomistEcProb'

export const saveEconomistEcProbDatapoints = async (
  datapoints: EcProbDataPoint[],
) => {
  let batch = db.batch()

  datapoints.forEach(datapoint => {
    const ref = db.collection(ECONOMIST_EC_PROB).doc()
    batch.set(ref, {
      ...datapoint,
      retrievedAt: admin.firestore.Timestamp.now(),
    })
  })

  return await batch.commit()
}

export const getLastTwoDatapoints = async () => {
  const qs = await db
    .collection(ECONOMIST_EC_PROB)
    .where('party', '==', 'democratic')
    .orderBy('retrievedAt', 'desc')
    .limit(2)
    .get()

  let returnable: EcProbDataPoint[] = []
  qs.forEach(doc => returnable.push(doc.data() as EcProbDataPoint))
  return returnable
}
