import React from 'react'
import { useHistory } from 'react-router-dom'
import { getAllPlaylists } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import Error from '../common/Error'
import PlaylistGrid from './PlaylistGrid'

function PlaylistIndex() {
  const history = useHistory()
  const [playlists, setAllPlaylists] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllPlaylists()
        console.log(response.data)
        setAllPlaylists(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredPlaylists = playlists?.filter((playlist) => {
    return playlist.name.toLowerCase().includes(searchTerm)
  })

  const handleCreatePlaylist = () => {
    history.push('/playlist/new')
  }

  return (
    <>
      <section className="hero is-primary">
        <div className="columns">
          <div className="hero-body">
            <p className="title">User Playlists</p>
            <p className="subtitle">Search through a huge collection of user playlists</p>
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
          {isAuthenticated() &&
            <aside id="aside" className="column is-one-quarter">
              <button className="button" onClick={handleCreatePlaylist}>Create New Playlist</button>
            </aside>
          }
        </div>
      </section>
      {playlists ? (
        <PlaylistGrid playlistList={filteredPlaylists} />
      ) : (
        <Error />
      )}
    </>
  )
}

export default PlaylistIndex
