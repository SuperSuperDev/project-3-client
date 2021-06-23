import React from 'react'
import { useHistory } from 'react-router-dom'
import { getAllSongs } from '../../lib/api'
import SongList from './SongList'

function SongsIndex() {
  const history = useHistory()
  const [songs, setAllSongs] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  // const [genres, setGenres] = React.useState(null)
  // const [genre, setGenre] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllSongs()
        // const allGenres = response.data.map(song => song.genre.toLowerCase())
        // const filteredGenres = Array()
        // for (let i = 0; i < allGenres.length; i++) {
        //   if (!filteredGenres.includes(allGenres[i].toLowerCase())) {
        //     filteredGenres.push(allGenres[i])
        //   }
        // }
        // setGenres(filteredGenres)
        setAllSongs(response.data)
      } catch (err) {
        console.log(err)
        history.push('./error')
      }
    }
    getData()
  }, [setAllSongs, history])

  
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  // const handleGenreFilter = ({ target }) => {
  //   console.log(target.value)
  //   setGenre(target.value)
  // }

  const filteredSongs = songs?.filter((song) => {
    return (
      song.name?.toLowerCase().includes(searchTerm)
      // song.genre?.toLowerCase().includes(genre)
    )
  })
  // const songList = { filteredSongs }
  // console.log(searchTerm)
  // console.log('filtered songs', songList)
  // console.log('sorea songlist: ', { ...songList })
  return (
    <>
      <section className="hero">
        <div className="hero-body ">
          <p className="title has-text-light">Search Songs</p>
          <p className="subtitle has-text-light">
            Search through a huge collection of songs
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
          {/* <div className="field" id="genre-filter">
            <div className="buttons">
              {genres && genres.map(genre => {
                return (
                  <>
                    <button className="button is-black has-text-white" onClick={handleGenreFilter} value={genre}>{genre}</button>
                  </>
                )
              })}
            </div>
          </div> */}
        </div>
      </section>
      <SongList songList={filteredSongs} />
    </>
  )
}

export default SongsIndex
