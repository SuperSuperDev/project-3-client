import React from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../../lib/api'
import { setToken, setLikes, setPlaylists } from '../../lib/auth'
import useForm from '../../hooks/useForm'

function Login() {
  const history = useHistory()
  const [isError, setIsError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const log = []

    try {
      const res = await loginUser(formdata)
      
      setToken(res.data.token)
      setLikes(res.data.likes)
      setPlaylists(res.data.playlists)

      log.push(res.data)
      history.push('/')

    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label has-text-light">Email</label>
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
              <label className="label has-text-light">Password</label>
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
      </div>
    </section>
  )
}

export default Login
