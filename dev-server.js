const path    = require('path')
const express = require('express')
const webpack = require('webpack')
const config  = require('./webpack.config.dev')

const app      = express()
const compiler = webpack(config)
const PORT     = process.env.PORT || 8080

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, function(error) {
  if (error) return console.error(error)
  console.log('Hello! I\'m running at http://localhost:' + PORT)
})
