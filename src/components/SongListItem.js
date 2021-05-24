import { Link } from 'react-router-dom'

function SongListItem({ _id, name, image, leadArtist }) {
  return (
    <div className="column is-full">
      <div className="media" key={_id}>
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={image} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <strong>{name}</strong>
            <br />
            <small>{leadArtist.name}</small>
            <small></small>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">🤍</span>
              </a>
              <a className="level-item">
                <span className="icon is-small">➕</span>
              </a>
            </div>
          </nav>
        </div>
        <div className="media-right">
          <button className="delete"></button>
          <a className="level-item">
            <span className="icon is-small">🤍</span>
          </a>
          <a className="level-item">
            <span className="icon is-small">➕</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SongListItem
