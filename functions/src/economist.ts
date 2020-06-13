import axios from 'axios'
import Papa from 'papaparse'
require('dotenv').config()

interface EcProbDataPoint {
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
