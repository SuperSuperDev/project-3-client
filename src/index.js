import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(<App />, document.getElementById('root'))
