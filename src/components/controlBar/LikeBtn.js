import React from 'react'
import { getLikes, setLikes } from '../../lib/auth'
import { useHistory } from 'react-router-dom'
import { addLike } from '../../lib/api'

function LikeBtn({ id, type, likesCount }) {
  const [likes, setLikes] = React.useState([])
  const [isLiked, setIsLiked] = React.useState(false)
  const history = useHistory()

  console.log('id is ', id)
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
    try {
      const res = await addLike(type, id, e.target.value)
      console.log(res.data)
      console.log('likes: ', res.data.likes)
      localStorage.setItem('likes', JSON.stringify(res.data.likes))
      setIsLiked(!isLiked)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <>
      {
        isLiked ? (
          <button className="button is-danger" value="minus" onClick={handleClick} >🤍</button>
        ) : (
          <button className="button" value="plus" onClick={handleClick}>🤍</button>
        )
      }
    </>
  )
}

export default LikeBtn