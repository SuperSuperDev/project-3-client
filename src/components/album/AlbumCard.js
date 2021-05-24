import { Link } from 'react-router-dom'

function AlbumCard({ _id, name, image, artists }) {
  return (
    <div
      className="column is-one-quarter-desktop is-one-third-tablet"
      key={_id}
    >
      <div className="card">
        <Link to={`albums/${_id}`}>
          <div className="card-header">
            <div className="card-header-title ">
              <div className="title">{name}</div>
            </div>
            <p className="subtitle">
              {artists &&
                artists.map((artist) => (
                  <span key={artist._id}>{artist.name} </span>
                ))}
            </p>
          </div>
          <div className="card-content is-flex is-horizontal-center">
            <img src={image} />
          </div>
          <div className="card-footer">
            <span className="card-footer-item">Add Song</span>
            <span className="card-footer-item subtitle">Like Song</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default AlbumCard