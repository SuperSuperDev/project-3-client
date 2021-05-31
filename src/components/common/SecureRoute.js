import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function SecureRoute({ component: Component, ...rest }) {
  if (!isAuthenticated()) {
    removeToken()
    return (<Redirect to="/login" />)
  }
  return <Route {...rest} component={Component} />

}

export default SecureRoute