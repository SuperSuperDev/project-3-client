import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getCommentsForSong } from '../../lib/api'

function SongComment({ id, commentsPassed }) {
  const history = useHistory()
  const [comments, setAllComments] = React.useState(null)


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCommentsForSong(id)
        console.log(response.data)
        setAllComments(response.data)

      } catch (err) {
        console.log(err.response.data)
        history.push('./error')
      }
    }
    getData()
  }, [])
  return (
    <div>
      {comments && comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.username.username}</p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  )


}
export default SongComment