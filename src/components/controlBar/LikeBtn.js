import React from 'react'
import { getLikes, isAuthenticated } from '../../lib/auth'
import { addLike } from '../../lib/api'

function LikeBtn({ id, type, likesCount }) {
  const [isLiked, setIsLiked] = React.useState(false)
  const loggedIn = isAuthenticated()
  const [likesNum, setLikesNum] = React.useState(likesCount)

  //! Check if user likes this Item
  React.useEffect(() => {
    if (loggedIn === true && getLikes().includes(id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [id, loggedIn])

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await addLike(type, id, e.target.value)
      console.log(res)
      localStorage.setItem('likes', JSON.stringify(res.data.likes))
      setIsLiked(!isLiked)
      console.log(e.target.value)
      if (e.target.value === 'plus') {
        setLikesNum(likesNum - 1)
      } else {
        setLikesNum(likesNum + 1)
      }
    } catch (err) {
      console.log(err.res)
    }
  }
  return (
    <>
      <div className="field has-addons">
        <div className="control">
          {isLiked ? (
            <button
              className="button is-danger"
              value="minus"
              onClick={handleClick}
            >
              🤍
            </button>
          ) : (
            <button className="button" value="plus" onClick={handleClick}>
              🤍
            </button>
          )}
        </div>
        <div className="control">
          <button className="button is-static">{likesNum}</button>
        </div>
      </div>
    </>
  )
}

export default LikeBtn
