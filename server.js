const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const routes = require('./routes')
require('isomorphic-unfetch')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const PORT = process.env.PORT || 3000
  createServer((req, res) => {
    handler(req, res)
  }).listen(PORT, err => {
    if (err) throw err
    console.log(`> Read on http://localhost:${PORT}`)
  })
})
