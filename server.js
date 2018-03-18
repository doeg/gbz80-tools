const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('./webpack.config.js')

const PORT = 3000
const HOSTNAME = '0.0.0.0'

const app = express()

const compiler = webpack(webpackConfig)
const middleware = webpackMiddleware(compiler, {
  contentBase: 'src',
  publicPath: webpackConfig.output.publicPath,
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    timings: true,
  },
})
app.use(middleware)

// HMR
app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res) => {
  res.write(
    middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html'))
  )
  res.end()
})

app.listen(PORT, HOSTNAME, err => {
  if (err) {
    console.error(err)
  }
  console.info(`Listening on http://${HOSTNAME}:${PORT}`)
})
