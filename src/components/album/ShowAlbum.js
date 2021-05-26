import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleAlbum } from '../../lib/api'
import Error from '../common/Error'
import SongList from '../song/SongList'


function ShowAlbum({ audioQueue, setAudioQueue }) {
  const { albumId } = useParams()
  const [album, setAlbum] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  // const isLoading = !album && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSingleAlbum(albumId)
        console.log(response.data)
        setAlbum(response.data)
        setAudioQueue(response.data.songs)
        console.log('console.log under setAudio', response.data.songs)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }

    getData()
  }, [albumId])

  // const handleDelete = async () => {
  //   await deleteAlbum(album._id)
  // }



  const filteredSongs = album?.songs.filter((song) => {
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
          <p className="title">{album?.name}</p>
          <p className="subtitle">{album?.artists && (
            album.artists.map(artist => <span key={artist._id}>{artist.name} </span>)
          )}</p>

          <div className="field is-grouped">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by album name"
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

export default ShowAlbum
