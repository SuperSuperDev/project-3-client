

function SongListItem({ _id, name, image, leadArtist, album }) {
  return (
    <div key={name} className="column is-full">
      <div className="box">
        <div className="media" key={_id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={image} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <strong className="title">{name}</strong>
              <br />
              <small className="subtitle">{leadArtist.name}</small>
              <br />
              <small>{album.name}</small>
            </div>
          </div>
          <div className="field is-grouped has-addons">
            <div className="media-right">
              <button className="icon">🤍</button>
            </div>
            <div className="media-right">
              <button className="icon">➕</button>
            </div>
            <div className="media-right">
              <button className="icon">▶️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongListItem
