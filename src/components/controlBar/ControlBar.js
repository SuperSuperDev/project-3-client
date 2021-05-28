import React from 'react'
import { getLikes } from '../../lib/auth'
import { useHistory } from 'react-router-dom'
import { addLike } from '../../lib/api'

function ControlBar({ id, type, likesCount }) {
  const [likes, setLikes] = React.useState([])
  const [isLiked, setIsLiked] = React.useState(false)
  const history = useHistory()
  // check if user likes this Item
  React.useEffect(() => {
    if (getLikes().includes(id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()
    console.log(e.target.value)
    try {
      const res = await addLike(type, id, e.target.value)
      res
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="field is-grouped has-addons">
      <div className="buttons">
        <button className="button">➕</button>
        <button className="button">▶️</button>
        {isLiked ? (
          <button className="button is-danger" value="minus" onClick={handleClick}>🤍</button>
        ) : (
          <button className="button" value="plus" onClick={handleClick}>🤍</button>
        )}
      </div>
    </div>
  )
}

export default ControlBar
