import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getSinglePlaylist, removePlaylist } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import Error from '../common/Error'
import SongList from '../song/SongList'


function ShowPlaylist() {
  const history = useHistory()
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSinglePlaylist(playlistId)
        setPlaylist(response.data)

      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [playlistId])


  const filteredSongs = playlist?.songs.filter((song) => {
    return song.name.toLowerCase().includes(searchTerm)
  })

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  
  const handleRemovePlaylist = async () => {
    try {
      await removePlaylist(playlistId)
      history.push('/playlists')

    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
      }
      console.log(err)
    }
  }
  
  return (
    <>
      <section className="hero is-primary">
        <div className="columns">
          <div className="hero-body">
            <p className="title">{playlist?.name} Playlist</p>
            <p className="subtitle">{playlist?.artists && (
              playlist.songs.map(song => <span key={song._id}>{song.name} </span>)
            )}</p>

            <div className="field is-grouped">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search this playlist"
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
          {(isOwner(playlist?.users[0]._id)) &&
            <aside id="aside" className="column">
              <button className="button" onClick={handleRemovePlaylist}>Delete Playlist</button>
            </aside>
          }
        </div>
      </section>
      { isError && <Error />}
      <SongList songList={filteredSongs} />
    </>
  )
}

export default ShowPlaylist
