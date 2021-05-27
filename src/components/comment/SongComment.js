import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { addCommentToSong, getCommentsForSong } from '../../lib/api'
import useForm from '../../hooks/useForm'
import { isAuthenticated } from '../../lib/auth'

function SongComment({ id, commentsPassed }) {
  const history = useHistory()
  const [comments, setAllComments] = React.useState(null)
  const [submit, setSubmit] = React.useState(false)

  const { formdata, handleChange } = useForm({
    text: '',
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCommentsForSong(id)
        console.log(response.data)
        const reversedArray = response.data.reverse()
        setAllComments(reversedArray)

      } catch (err) {
        console.log(err.response.data)
        history.push('./error')
      }
    }
    getData()
  }, [submit])
  const handleAddComment = async event => {
    event.preventDefault()
    try {
      const res = await addCommentToSong(formdata, id)
      setSubmit(!submit)
      console.log(res.data)
    } catch (err) {
      if (err.repsonse) {
        console.log(err.repsonse.data)
      } else {
        console.log(err)
      }
    }
  }
  return (
    <>
      <div id="comments-scroll">
        {comments && comments.map(comment => (
          <div key={comment._id} className="box is-primary">
            <p>{comment.username.username}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div>
      </div>
      {isAuthenticated() &&
        <section id="add-comment">
          <div className="columns is-mobile">
            <div className="column box">
              <form className="form" onSubmit={handleAddComment}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="Add a comment"
                      name="text"
                      value={formdata.text}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="button is-link">Add Comment</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default SongComment