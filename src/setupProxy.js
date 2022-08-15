const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  console.log('process.env.API_URL', process.env.API_URL)
  app.use(
    createProxyMiddleware(
      '/api',
      { target: 'http://localhost:4000/api' } //* Update this line if your API is accessible on a port other than 8000, eg 4000
    )
  )
}
