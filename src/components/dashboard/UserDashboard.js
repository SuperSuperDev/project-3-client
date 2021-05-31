import React from 'react'
import UserAlbums from './UserAlbums'
import UserPlaylist from './UserPlaylist'
import UserSongs from './UserSongs'
import { useHistory } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

function UserDashboard() {
  const history = useHistory()
  if (!isAuthenticated()){
    history.push('/login')
  } 
  return (
    <>
      <h1>User Dashboard</h1>
      <div className="container">
        <div className="section">
          <div className="box">
            <UserPlaylist />
          </div>
        </div>
        <div className="section">
          <div className="box">
            <UserSongs />
          </div>
        </div>
        <div className="section">
          <div className="box">
            <UserAlbums />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDashboard
