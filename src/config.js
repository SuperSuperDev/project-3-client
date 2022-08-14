// const devUrl = '/api'
// const devUrl = process.env.REACT_APP_PROD_URL
// const prodUrl = process.env.REACT_APP_PROD_URL
// export const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl
const dotenv = require('dotenv')
dotenv.config()
export const baseUrl = process.env.API_URL || 'http://localhost:4000/api'
