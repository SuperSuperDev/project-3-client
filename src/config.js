// const devUrl = '/api'
// const devUrl = process.env.REACT_APP_PROD_URL
// const prodUrl = process.env.REACT_APP_PROD_URL
// export const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
// const dotenv = require('dotenv')
// dotenv.config()
const apiUrl = process.env.API_URL
console.log('apiUrl :', apiUrl)
export const baseUrl = process.env.API_URL
