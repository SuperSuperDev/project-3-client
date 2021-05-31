import React from 'react'
import { addSongToPlaylist, getUsersPlaylist } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import LoginMini from '../auth/LoginMini'

import NewPlaylistForm from '../forms/NewPlaylistForm'

function PlaylistBtnDropdown(props) {
  const [modalIsActive, setModalIsActive] = React.useState(false)
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
  }, [setUsersPlaylists, loggedIn, modalIsActive])

  const toggleNewPlaylistModal = () => {
    setModalIsActive(!modalIsActive)
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

  return (
    <>
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
        <LoginMini checkLoggedIn={checkLoggedIn} />
      )}

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

export default PlaylistBtnDropdown
