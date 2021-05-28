function ControlBar({ id, type }) {

  return (
    <>
      <div className="media-right">
        <button className="icon"><i className="far fa-heart"></i>🤍 - {id} - {type}</button>
      </div>
      <div className="media-right">
        <button className="icon">➕</button>
      </div>
      <div className="media-right">
        <button className="icon">▶️</button>
      </div>
    </>
  )
}

export default ControlBar
