import React from 'react'
import SongComment from '../comment/SongComment'
import ControlBar from '../controlBar/ControlBar'
import PlayBtn from '../controlBar/PlayBtn'
import PlaylistBtn from '../controlBar/PlaylistBtn'
import LikeBtn from '../controlBar/LikeBtn'
import { isOwner } from '../../lib/auth'
import { editSong } from '../../lib/api'

function SongListItem(props) {
  const [commentHidden, setCommentHidden] = React.useState(false)

  const handleCommentExpand = () => {
    setCommentHidden(!commentHidden)
  }

  const [shadowDeleted, setShadowDeleted] = React.useState(false)
  const handleShadowDelete = async () => {
    setShadowDeleted(!shadowDeleted)
    try {
      await editSong(props._id, { ...props, isDeleted: true })
    } catch (e) {
      console.log(e?.response.data)
    }
  }

  return (
    <>
      {!shadowDeleted && (
        <div id="song-item" className="box">
          <div className="media" key={props._id}>
            <figure className="media-left">
              <p className="image is-128x128">
                <img src={props.cover} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <strong id="song-title" className="title has-text-light">
                  {props.name}
                </strong>
                <br />
                <small className="subtitle has-text-light">
                  {props.singer.name}
                </small>
                <br />
                <small className="has-text-light">{props.album.name}</small>
              </div>
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="buttons">
                      <button
                        className="button is-info"
                        onClick={handleCommentExpand}
                      >
                        Comments
                      </button>
                    </div>
                  </div>
                  <div className="level-right">
                    <ControlBar>
                      <PlaylistBtn {...props} />
                      <PlayBtn {...props} />
                      <LikeBtn
                        id={props._id}
                        type="Song"
                        likesCount={props.likesCount}
                      />
                    </ControlBar>
                  </div>
                </div>
              </div>

              {commentHidden && (
                <div className="box">
                  <SongComment commentsPassed={props.comments} id={props._id} />
                </div>
              )}
            </div>

            <div className="field has-addons">
              <div className="media-right">
                {isOwner(props.user) && (
                  <span>
                    <button
                      onClick={handleShadowDelete}
                      id="delete-song-button"
                      className="button is-danger"
                    >
                      🗑
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SongListItem
