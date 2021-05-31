import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteAlbum, getSingleAlbum } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import Error from '../common/Error'
import SongList from '../song/SongList'


function ShowAlbum() {
  const history = useHistory()
  const { albumId } = useParams()
  const [album, setAlbum] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSingleAlbum(albumId)
        console.log(response.data)
        setAlbum(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [albumId])


  const filteredSongs = album?.songs.filter((song) => {
    return song.name.toLowerCase().includes(searchTerm)
  })

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const handleRemoveAlbum = async () => {
    try {
      await deleteAlbum(albumId)
      history.push('/albums')

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
            <p className="title">{album?.name}</p>
            <p className="subtitle">{album?.artists && (
              album.artists.map(artist => <span key={artist._id}>{artist.name} </span>)
            )}</p>

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
          {isOwner(album?.user) &&
            <aside id="aside" className="column">
              <button className="button" onClick={handleRemoveAlbum}>Delete Album</button>
            </aside>
          }
        </div>
      </section>
      {isError && <Error />}
      <SongList songList={filteredSongs} />
    </>
  )
}

export default ShowAlbum
