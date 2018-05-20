const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')
const axios = require('axios')

var pusher = new Pusher(require('./config.live.js'))

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  next()
})

// Routes
app.get('/', _ => res.send('Welcome'))

// Simulated Cron
setInterval(_ => {
  let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EVX&tsyms=THB'
  axios.get(url).then(res => {
    pusher.trigger('price-updates', 'coin-updates', {
      coin: res.data
    })
  })
}, 5000)


// Start App
app.listen(8000, () => console.log('App running on port 8000!'))
