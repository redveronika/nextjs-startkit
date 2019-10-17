const routes = require('next-routes')

module.exports = routes()
  .add('index', '/:locale(ru|en)')
  .add('about', '/:locale(ru|en)/about')
