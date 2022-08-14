const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api',
      { target: 'http://localhost:4000/api' } //* Update this line if your API is accessible on a port other than 8000, eg 4000
    )
  )
}
