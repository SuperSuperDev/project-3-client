import ControlBar from '../controlBar/ControlBar'


function SongListItem({ _id, name, cover, singer, album }) {
  return (
    <div key={name} className="column is-full">
      <div className="box">
        <div className="media" key={_id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={cover} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <strong className="title">{name}</strong>
              <br />
              <small className="subtitle">{singer.name}</small>
              <br />
              <small>{album.name}</small>
            </div>
          </div>
          <div className="field is-grouped has-addons">
            <div className="media-right">
              <ControlBar id={_id} type='Song'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongListItem
