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
  console.log(props)
  const handleShadowDelete = async () => {
    setShadowDeleted(!shadowDeleted)
    try {
      const res = await editSong(props._id, { ...props, isDeleted: true })
      console.log(res)
    } catch (e) {
      console.log(e?.resposne.data)
    }
  }
  return (
    <div key={props.name} className="column is-full">
      <div className="box">
        <div className="media" key={props._id}>
          <figure className="media-left">
            <p className="image is-256x256">
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
              <button className="button is-info" onClick={handleCommentExpand}>
                Show Comments
              </button>
              {commentHidden && (
                <SongComment commentsPassed={props.comments} id={props._id} />
              )}
            </div>
          </div>
          <div className="field is-grouped has-addons">
            <div className="media-right">
              <ControlBar>
                <PlaylistBtn />
                <PlayBtn {...props} />
                <LikeBtn
                  id={props._id}
                  type="Song"
                  likesCount={props.likesCount}
                />
              </ControlBar>
              <>
                {!shadowDeleted && (
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
                            <small className="subtitle">
                              {props.singer.name}
                            </small>
                            <br />
                            <small>{props.album.name}</small>
                          </div>
                          <div>
                            <button
                              className="button is-info"
                              onClick={handleCommentExpand}
                            >
                              Show Comments
                            </button>
                            {commentHidden && (
                              <SongComment
                                commentsPassed={props.comments}
                                id={props._id}
                              />
                            )}
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
                        <div className="field is-grouped has-addons">
                          <div className="media-right">
                            <ControlBar>
                              <PlaylistBtn />
                              <PlayBtn {...props} />
                              <LikeBtn
                                id={props._id}
                                type='Song'
                                likesCount={props.likesCount}
                              />
                            </ControlBar>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
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
