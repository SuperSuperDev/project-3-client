import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { addCommentToSong, deleteCommentInSong, editCommentInSong, getCommentsForSong } from '../../lib/api'
import useForm from '../../hooks/useForm'
import { isAuthenticated, isOwner } from '../../lib/auth'

function SongComment({ id, commentsPassed }) {
  const history = useHistory()
  const [comments, setAllComments] = React.useState(null)
  const [submit, setSubmit] = React.useState(false)
  const [commentEdit, setCommentEdit] = React.useState(false)
  const [currentCommentId, setCurrentCommentId] = React.useState('')

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
  const editComment = (event) => {
    setCommentEdit(true)
    const commentId = event.target.value.split('-')[0]
    const text = event.target.value.split('-')[1]
    formdata.text = text
    setSubmit(!submit)
    setCurrentCommentId(commentId)
  }

  const handleEditComment = async (event) => {
    event.preventDefault()
    try {
      const res = await editCommentInSong(formdata, id, currentCommentId)
      console.log(res.data)
      formdata.text = ''
      setSubmit(!submit)
    } catch (err) {
      console.log(err?.response.data)
    }
  }

  const handleDeleteComment = async (event) => {
    const commentId = event.target.value
    try {
      await deleteCommentInSong(id, commentId)
      setSubmit(!submit)
    } catch (err) {
      console.log(err?.response.data)
    }
  }
  return (
    <>
      <div id="comments-scroll">
        {comments && comments.map(comment => (
          <div key={comment._id} className="box is-primary">
            <p>{comment.username.username}</p>
            <p>{comment.text}</p>
            {isOwner(comment.username._id) &&
              <span>
                <button type="button" value={`${comment._id}-${comment.text}`} onClick={editComment}>Edit</button>
                <button type="button" value={comment._id} onClick={handleDeleteComment}>Delete</button>
              </span>
            }
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
                  {!commentEdit ?
                    <button type="submit" className="button is-link">Add Comment</button>
                    : <button type="button" onClick={handleEditComment} className="button is-warning">Edit Comment</button>
                  }
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