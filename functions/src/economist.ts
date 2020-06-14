import { LocalDate } from '@js-joda/core'
import axios from 'axios'
import Papa from 'papaparse'
import {
  getLastTwoDatapoints,
  saveEconomistEcProbDatapoints,
} from './firestore'
require('dotenv').config()

export const tweetEcProb = async () => {
  const datapoints = await getData()
  const today = datapoints.filter(dp =>
    LocalDate.parse(dp.date).equals(LocalDate.now()),
  )
  if (today.length > 0) {
    await saveEconomistEcProbDatapoints(today)
    const lastTwo = await getLastTwoDatapoints()

    if (lastTwo[1].winProb !== lastTwo[0].winProb) {
      console.log(getEcProbTweetText(lastTwo[1].winProb, lastTwo[0].winProb))
    }
  }
}

export interface EcProbDataPoint {
  date: string
  party: 'democratic' | 'republican'
  win_prob: string
  winProb?: number
}

export const getData = () =>
  axios
    .get<string>(
      'https://cdn.economistdatateam.com/us-2020-forecast/data/president/electoral_college_probability_over_time.csv',
    )
    .then(response =>
      Papa.parse<EcProbDataPoint>(response.data, {
        header: true,
      })
        .data.filter(e => e.date)
        .map(e => ({ ...e, winProb: Number(e.win_prob) })),
    )

export const getEcProbTweetText = (
  prev: number | undefined,
  curr: number | undefined,
) => {
  if (prev && curr) {
    return `New Prediction by The Economist
${curr > prev ? '⬆' : '⬇'} ${formatAsPercentage(
      curr,
    )}: Joe Biden to win election
(previous: ${formatAsPercentage(prev)})

https://projects.economist.com/us-2020-forecast/president
`
  } else throw `Invalid values: ${prev}, ${curr}`
}

const formatAsPercentage = (n: number) => `${(n * 100).toFixed(1)}%`
