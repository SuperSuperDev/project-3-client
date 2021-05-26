import { Link } from 'react-router-dom'

function SongCard({ _id, name, cover }) {
  return (
    <div
      className="column is-one-quarter-desktop is-one-third-tablet"
      key={_id}
    >
      <div className="card">
        <Link to={`songs/${_id}`}>
          <div className="card-header">
            <div className="card-header-title"> {name}</div>
          </div>
          <div className="card-content is-flex is-horizontal-center">
            <img src={cover} />
          </div>
          <div className="card-footer">
            <span // ! Added Footer Items
              className="card-footer-item"
            >
              Add Song
            </span>
            <span className="card-footer-item subtitle">Like Song</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default SongCard
