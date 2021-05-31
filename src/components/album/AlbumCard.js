import { Link } from 'react-router-dom'
import React from 'react'

import { getAllSongsInAlbum } from '../../lib/api'
import { AudioQueueContext } from '../../App.js'

function AlbumCard({ _id, name, cover, artists, leadArtist }) {
  const { updateAudioQueue } = React.useContext(AudioQueueContext)
  const [songs, setSongs] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllSongsInAlbum(_id)
        setSongs(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [_id])

  const addAlbumToQueue = () => {
    const songsToPlay = songs.map(song => {
      return {
        name: song.name,
        cover: song.cover,
        singer: song.singer.name,
        musicSrc: song.musicSrc,
      }
    })
    updateAudioQueue(songsToPlay, false)
  }

  return (
    <div className="card">
      <Link to={`albums/${_id}`}>
        <div className="card-header">
          <div className="card-header-title ">
            <div className="title">{name}</div>
          </div>
          <p className="subtitle">
            {artists &&
              <span key={`card-${leadArtist?._id}`}>{leadArtist?.name}</span>
            }
          </p>
        </div>
        <div className="card-content is-flex is-horizontal-center">
          <img src={cover} />
        </div>
      </Link>
      <div className="card-footer">
        <button className="card-footer-item button is-warning" onClick={addAlbumToQueue}>Add To Queue</button>
      </div>
    </div>
  )
}

export default AlbumCard
