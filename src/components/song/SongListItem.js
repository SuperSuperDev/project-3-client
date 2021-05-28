import React from 'react'
import SongComment from '../comment/SongComment'
import ControlBar from '../controlBar/ControlBar'
import PlayBtn from '../controlBar/PlayBtn'
import PlaylistBtn from '../controlBar/PlaylistBtn'
import LikeBtn from '../controlBar/LikeBtn'

function SongListItem(props) {
  const [commentHidden, setCommentHidden] = React.useState(false)
  const handleCommentExpand = () => {
    setCommentHidden(!commentHidden)
  }
  console.log('props:', props)
  return (
    <div key={props.name} className="column is-full">
      <div className="box">
        <div className="media" key={props._id}>
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={props.cover} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <strong className="title">{props.name}</strong>
              <br />
              <small className="subtitle">{props.singer.name}</small>
              <br />
              <small>{props.album.name}</small>
            </div>
            <div>
              <button className="button is-info" onClick={handleCommentExpand}>Show Comments</button>
              {commentHidden &&
                <SongComment commentsPassed={props.comments} id={props._id} />
              }
            </div>
          </div>
          <div className="field is-grouped has-addons">
            <div className="media-right">
              <ControlBar>
                <PlaylistBtn />
                <PlayBtn {...props} />
                <LikeBtn id={props._id} type='Song' likesCount={props.likesCount} />
              </ControlBar>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// id={_id}
// type='Song'
// {...props}
export default SongListItem
