import React from 'react'
import { Link } from 'react-router-dom'
import { AudioQueueContext } from '../../App.js'
import { getAllSongsInPlaylist } from '../../lib/api.js'

function PlaylistCard({ _id, name, cover }) {
  const { updateAudioQueue } = React.useContext(AudioQueueContext)
  const [songs, setSongs] = React.useState(null)
  const addPlaylistToQueue = async () => {
    const songsToAddToQueue = songs.map(song => {
      return {
        name: song.name,
        singer: song.singer.name,
        cover: song.cover,
        musicSrc: song.musicSrc,
      }
    })
    updateAudioQueue(songsToAddToQueue, false)
  }
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllSongsInPlaylist(_id)
        setSongs(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [_id])
  return (
    <div id="playlist-card" className="card">
      <Link to={`playlists/${_id}`}>
        <div className="card-header">
          <div className="card-header-title ">
            <div className="title has-text-light">{name}</div>
          </div>
          {/* <p className="subtitle">
              {playlists &&
                playlists.map((playlist) => (
                  <span key={playlist._id}>{playlist.name} </span>
                ))}
            </p> */}
        </div>
        <div className="card-content is-flex is-horizontal-center">
          <img src={cover} />
        </div>
      </Link>
      <div className="card-footer">
        <button className="card-footer-item button is-warning" onClick={addPlaylistToQueue}>Add To Queue</button>
      </div>
    </div >
  )
}

export default PlaylistCard
