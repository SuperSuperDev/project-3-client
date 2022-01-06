import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken, setLikes, setPlaylists } from '../../lib/auth'
import useForm from '../../hooks/useForm'


function LoginMini({ checkLoggedIn }) {
  const [isError, setIsError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(formdata)
      setToken(res.data.token)
      setLikes(res.data.likes)
      setPlaylists(res.data.playlists)
      console.log('Retuirning check Logged In')
      return checkLoggedIn()
    } catch (err) {
      setIsError(true)
    }
  }

  
  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        {isError && (
          <p className="help is-danger">
            Either email or password were incorrect
          </p>
        )}
        <div className="field">
          <button type="submit" className="button is-fullwidth is-warning">
            Log Me In!
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginMini
