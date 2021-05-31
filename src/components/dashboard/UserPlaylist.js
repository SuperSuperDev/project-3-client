import React from 'react'

import { getAllPlaylists } from '../../lib/api'
import { isAuthenticated, isOwner } from '../../lib/auth'
import Error from '../common/Error'
import PlaylistGrid from '../Playlist/PlaylistGrid'

function UserPlaylist() {
  const [playlists, setAllPlaylists] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllPlaylists()
        setAllPlaylists(response.data)

      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])


  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredPlaylists = playlists?.filter((playlist) => {
    return (
      playlist.name.toLowerCase().includes(searchTerm) &&
      isOwner(playlist.user._id)
    )
  })

  const handleCreatePlaylist = () => {
    history.push('/playlist/new')
  }

  return (
    <>
      <section className="hero is-primary is-small">
        <div className="columns">
          <div className="hero-body">
            <p className="title">My Playlists</p>
            <p className="subtitle">
              Search through a huge collection of user playlists
            </p>
            <div className="field is-grouped">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search by song name"
                  onChange={handleInput}
                  value={searchTerm}
                />
              </div>
              <div className="control">
                <button className="button" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </div>
          </div>
          {isAuthenticated() && (
            <aside id="aside" className="column is-one-quarter">
              <button className="button" onClick={handleCreatePlaylist}>
                Create New Playlist
              </button>
            </aside>
          )}
        </div>
      </section>
      {playlists ? (
        <PlaylistGrid playlistList={filteredPlaylists} />
      ) : (
        <>
          <p>You have not added any playlists yet</p>
          <Error />
        </>
      )}
    </>
  )
}

export default UserPlaylist
