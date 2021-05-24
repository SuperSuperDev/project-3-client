import React from 'react'

import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SongsIndex from './components/song/SongsIndex'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/songs" component={SongsIndex} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
