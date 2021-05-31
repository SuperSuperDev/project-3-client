import { Link } from 'react-router-dom'

function PlaylistCard({ _id, name, cover, playlists }) {
  return (
    <div
      className="column is-one-quarter-desktop is-one-third-tablet"
      key={_id}
    >
      <div className="card">
        <Link to={`playlists/${_id}`}>
          <div className="card-header">
            <div className="card-header-title ">
              <div className="title">{name}</div>
            </div>
          </div>
          <div className="card-content is-flex is-horizontal-center">
            <img src={cover} />
            {
              (playlists && 
              playlists.songs.map((song) => (
                <p key={song.name}>
                  <strong>{song.name}</strong>
                </p>
              )))
            }
          </div>
          <div className="card-footer">
            <span className="card-footer-item">Add Playlist</span>
            <span className="card-footer-item">Like Playlist</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default PlaylistCard
