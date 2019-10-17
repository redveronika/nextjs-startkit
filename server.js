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
  createServer((req, res) => {
    const { pathname } = parse(req.url, true)
    if (pathname === '/') {
      const locale = 'ru'
      res.setHeader(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      )
      // TODO include query here, now it's being reset
      res.writeHead(302, { Location: `/${locale}` })
      res.end()
      return
    }
    handler(req, res)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Read on http://localhost:3000')
  })
})
