import { Link } from 'react-router-dom'

function AlbumCard({ _id, name, cover, artists, leadArtist }) {
  console.log(artists)
  return (
    <div className="card">
      <Link to={`albums/${_id}`}>
        <div className="card-header">
          <div className="card-header-title ">
            <div className="title">{name}</div>
          </div>
          <p className="subtitle">
            {artists &&
              <span key={`card-${leadArtist._id}`}>{leadArtist.name}</span>
            }
          </p>
        </div>
        <div className="card-content is-flex is-horizontal-center">
          <img src={cover} />
        </div>
        <div className="card-footer">
          <span className="card-footer-item">Add Song</span>
          <span className="card-footer-item subtitle">Like Song</span>
        </div>
      </Link>
    </div>
  )
}

export default AlbumCard
