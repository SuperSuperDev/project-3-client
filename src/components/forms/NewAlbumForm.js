import { useState } from 'react'
import { useHistory } from 'react-router'
import Creatable from 'react-select/creatable'
import useForm from '../../hooks/useForm'
import { createAlbum } from '../../lib/api'
import ImageUpload from '../upload/ImageUpload'
import ArtistForm from './ArtistForm'

function NewAlbumForm() {
  const history = useHistory()

  const [selectedArtists, setSelectedArtists] = useState(null)

  const { formdata, handleChange } = useForm({
    name: '',
    year: '',
    cover: '',
    leadArtist: '',
  })

  const handleUpload = url => {
    handleChange({ target: { name: 'cover', value: url } })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const artists = selectedArtists ? selectedArtists.map(artist => artist.value) : []
    try {
      if (!formdata.cover) {
        formdata.cover = undefined
      }
      const res = await createAlbum({ ...formdata, artists: artists, length: 0 })
      history.push(`/albums/${res.data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleSelect = target => {
    handleChange({ target: { name: 'leadArtist', value: target.value } })
  }

  console.log(formdata)

  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          <form className="form" onSubmit={handleSubmit}>
            <label className="label has-text-centered">Create Album</label>
            <div className="field">
              <div className="control">
                <label className="label">Name</label>
                <input
                  className="input"
                  placeholder="Album Name"
                  name="name"
                  onChange={handleChange}
                  value={formdata.name}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Release Date</label>
                <input
                  className="input"
                  type="date"
                  placeholder="Year Album released"
                  name="year"
                  onChange={handleChange}
                  value={formdata.year}
                />
              </div>
            </div>
            <ArtistForm selectedArtists={selectedArtists} setSelectedArtists={setSelectedArtists} />
            <div className="field">
              <div className="control">
                <label className="label">Lead Artist</label>
                <Creatable options={selectedArtists} onChange={handleSelect} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Cover</label>
                <ImageUpload onUpload={handleUpload} />
              </div>
            </div>
            <div className="field">
              <button className="button is-fullwidth is-dark" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default NewAlbumForm