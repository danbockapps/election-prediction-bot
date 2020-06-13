import axios from 'axios'
import Papa from 'papaparse'
require('dotenv').config()


export const getData = () =>
  axios
    .get<string>(
      'https://cdn.economistdatateam.com/us-2020-forecast/data/president/electoral_college_probability_over_time.csv',
    )
    .then(response => Papa.parse(response.data, { header: true }).data)

