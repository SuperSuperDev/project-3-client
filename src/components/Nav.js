import React from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Nav() {
  const location = useLocation()
  const history = useHistory()
  const isLoggedIn = isAuthenticated()
  const [menuIsActive, setMenuIsActive] = React.useState(false)
  const toggleMenu = () => {
    setMenuIsActive(!menuIsActive)
  }
  const handleLogout = () => {
    removeToken()
    history.push('/')
  }
  React.useEffect(() => {
    setMenuIsActive(false)
  }, [location.pathname])
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            {' '}
            🎶 {' '}Home
          </Link>
          <span
            className={`navbar-burger ${menuIsActive ? 'is-active' : ''} `}
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div className={`navbar-menu ${menuIsActive ? 'is-active' : ''} `}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              {' '}
              Home
            </Link>
          </div>{' '}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!isLoggedIn ? (
                  <>
                    <Link to="/register" className="button is-warning">
                      Register
                    </Link>
                    <Link to="/login" className="button is-warning">
                      Log In
                    </Link>
                  </>
                ) : (
                  <button className="button is-warning" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
