import { LocalDate } from '@js-joda/core'
import axios from 'axios'
import Papa from 'papaparse'
import { saveEconomistEcProbDatapoints } from './firestore'
require('dotenv').config()

export const getAndSave = async () => {
  const datapoints = await getData()
  const today = datapoints.filter(dp =>
    LocalDate.parse(dp.date).equals(LocalDate.now()),
  )
  saveEconomistEcProbDatapoints(today)
}

export interface EcProbDataPoint {
  date: string
  party: 'democratic' | 'republican'
  win_prob: number
}

export const getData = () =>
  axios
    .get<string>(
      'https://cdn.economistdatateam.com/us-2020-forecast/data/president/electoral_college_probability_over_time.csv',
    )
    .then(response =>
      Papa.parse<EcProbDataPoint>(response.data, {
        header: true,
      }).data.filter(e => e.date),
    )
