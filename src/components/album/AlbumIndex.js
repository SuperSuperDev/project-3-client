import React from 'react'
import { useHistory } from 'react-router-dom'
import { getAllAlbums } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

import AlbumGrid from './AlbumGrid'

function AlbumIndex() {
  const history = useHistory()
  const [albums, setAllAlbums] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllAlbums()
        console.log(response.data)
        setAllAlbums(response.data)
      } catch (err) {
        console.log(err)
        history.push('./error')
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

  const filteredAlbums = albums?.filter((album) => {
    return album.name.toLowerCase().includes(searchTerm)
  })
  // const songList = { filteredSongs }
  // console.log(searchTerm)
  // console.log('filtered songs', songList)
  // console.log('sorea songlist: ', { ...songList })
  const handleCreateAlbum = () => {
    history.push('/albums/new')
  }
  return (
    <>
      <section className="hero is-primary">
        <div className="columns">
          <div className="hero-body">
            <p className="title">Search Albums</p>
            <p className="subtitle">Search through a huge collection of albums</p>
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
          {isAuthenticated() &&
            <aside id="aside" className="column is-one-quarter">
              <button className="button" onClick={handleCreateAlbum}>Create New Album</button>
            </aside>
          }
        </div>
      </section>
      <AlbumGrid albumList={filteredAlbums} />
    </>
  )
}

export default AlbumIndex
