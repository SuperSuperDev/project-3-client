import React from 'react'
import { addSongToPlaylist, getUsersPlaylist } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import LoginMini from '../auth/LoginMini'
import Loader from 'react-loader-spinner'
import NewPlaylistForm from '../forms/NewPlaylistForm'

function PlaylistBtnDropdown(props) {
  const [modalIsActive, setModalIsActive] = React.useState(false)
  const [usersPlaylists, setUsersPlaylists] = React.useState(null)
  const [playlistUpdated, setPlaylistUpdated] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated())
  const [isLoading, setIsLoading] = React.useState(true)
  const checkLoggedIn = () => {
    setLoggedIn(true)
    return loggedIn
  }
  React.useEffect(() => {
    const getData = async () => {
      try {
        if (loggedIn) {
          const response = await getUsersPlaylist()
          setUsersPlaylists(response.data)
          setIsLoading(false)
        }
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
    try {
      if (loggedIn) {
        await addSongToPlaylist(playlistId, songId)
        setPlaylistUpdated(true)
      }
    } catch (err) {
      console.log(err.res)
    }
  }

  return (
    <>
      {loggedIn && (
        <div className="box">
          {isLoading && (
            <div id="loader">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={150}
                width={150}
                timeout={3000} //3 secs
              />
            </div>
          )}{' '}
          <ul>
            {!playlistUpdated ? (
              usersPlaylists?.map((playlist) => (
                <li key={playlist._id} className="dropdpwn-item">
                  <button className="button" value={playlist._id}>
                    <span className="icon is-32x32">
                      <img src={playlist.cover} />
                    </span>
                    <span onClick={handleAddToPlaylist} id={playlist._id}>
                      {playlist.name} ({playlist.songs.length})
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
      )}
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
