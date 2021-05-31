import React from 'react'
import { addSongToPlaylist, getUsersPlaylist } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import LoginMini from '../auth/LoginMini'

import NewPlaylistForm from '../forms/NewPlaylistForm'

function PlaylistBtn(props) {
  const [modalIsActive, setModalIsActive] = React.useState(false)
  const [dropDownIsActive, setDropDownIsActive] = React.useState(false)
  const [usersPlaylists, setUsersPlaylists] = React.useState(null)
  const [playlistUpdated, setPlaylistUpdated] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  const checkLoggedIn = () => {
    setLoggedIn(true)
    return loggedIn
  }
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUsersPlaylist()
        console.log(response.data)
        setUsersPlaylists(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [setUsersPlaylists, loggedIn])

  const toggleNewPlaylistModal = () => {
    setModalIsActive(!modalIsActive)
  }
  const toggleDropDown = () => {
    setDropDownIsActive(!dropDownIsActive)
  }
  const handleAddToPlaylist = async (e) => {
    e.preventDefault()
    const playlistId = e.target.id
    const songId = props._id
    console.log('Clicked', playlistId)
    console.log('Props: ', songId)
    try {
      const res = await addSongToPlaylist(playlistId, songId)
      console.log(res)
      setPlaylistUpdated(true)
    } catch (err) {
      console.log(err.res)
    }
  }

  console.log('Props: ', props)
  return (
    <>
      <div className={`dropdown ${dropDownIsActive && 'is-active'}`}>
        <div className="dropdown-trigger">
          <button
            onClick={toggleDropDown}
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            ➕
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="box">
              <ul>
                {!playlistUpdated ? (
                  usersPlaylists?.map((playlist) => (
                    <li key={playlist._id}>
                      <button className="button" value={playlist._id}>
                        <span className="icon">➕ </span>
                        <span onClick={handleAddToPlaylist} id={playlist._id}>
                          {playlist.name} ({playlist.songs.length} Songs)
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li>
                    <p>Playlist has been updated</p>
                  </li>
                )}
              </ul>
            </div>

            {loggedIn ? (
              <div className="box">
                <button
                  className="button is-primary"
                  onClick={toggleNewPlaylistModal}
                >
                  <span className="icon">➕ </span>
                  <span>New Playlist</span>
                </button>
              </div>
            ) : (
              <LoginMini checkLoggedIn={checkLoggedIn}/>
            )}
          </div>
        </div>
      </div>
      <div className={`modal ${modalIsActive && 'is-active'}`}>
        <div
          className="modal-background"
          onClick={toggleNewPlaylistModal}
        ></div>
        <div className="modal-content">
          ${modalIsActive && <NewPlaylistForm stopPushHistory />}
        </div>
        <button
          onClick={toggleNewPlaylistModal}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </>
  )
}

export default PlaylistBtn
