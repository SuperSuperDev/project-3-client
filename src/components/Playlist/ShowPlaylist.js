import React from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePlaylist } from '../../lib/api'
import Error from '../common/Error'
import SongList from '../song/SongList'


function ShowPlaylist() {
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  // const isLoading = !album && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSinglePlaylist(playlistId)
        console.log(response.data)
        setPlaylist(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }

    getData()
  }, [playlistId])

  // const handleDelete = async () => {
  //   await deleteAlbum(album._id)
  // }
  

  const filteredSongs = playlist?.songs.filter((song) => {
    return song.name.toLowerCase().includes(searchTerm)
  })
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }
  // const songList = { filteredSongs }
  // console.log(searchTerm)
  // console.log('filtered songs', songList)
  // console.log('sorea songlist: ', { ...songList })

  return (
    <>
      <section className="hero is-primary">
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
      </section>
      {isError && <Error />}
      <SongList songList={filteredSongs} />
    </>
  )
}

export default ShowPlaylist
