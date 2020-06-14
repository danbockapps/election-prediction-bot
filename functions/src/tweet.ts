import Twitter from 'twitter-lite'
require('dotenv').config()

let twitter: Twitter

if (
  process.env.API_KEY &&
  process.env.API_SECRET_KEY &&
  process.env.ACCESS_TOKEN &&
  process.env.ACCESS_TOKEN_SECRET
) {
  twitter = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  })
} else throw 'process.env variables not found'

export const sendTweet = async (status: string) =>
  await twitter.post('statuses/update', { status })

export interface Tweet {
  id_str: string
  text: string
  quoted_status_id_str: string
  created_at: string
  // There's a ton of other stuff in an actual Tweet object
}
