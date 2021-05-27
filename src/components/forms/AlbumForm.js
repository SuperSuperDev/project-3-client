import { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'

import useForm from '../../hooks/useForm.js'
import { createAlbum, getAllAlbums } from '../../lib/api.js'
import ImageUpload from '../upload/ImageUpload.js'


function AlbumForm() {
  const [albums, setAlbums] = useState(null)
  const [hasAlbum, setHasAlbum] = useState(true)

  const { formdata, handleChange } = useForm({
    name: '',
    about: '',
    cover: ''
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const resAlbums = await getAllAlbums()
        const convertedAlbums = resAlbums.data.map(album => {
          return {
            value: album._id,
            label: album.name
          }
        })
        setAlbums(convertedAlbums)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [hasAlbum])

  const handleUpload = (files) => {
    handleChange({ target: { name: 'cover', value: files } })
  }

  const handleSubmit = event => {
    event.preventDefault()

    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }

  const handleMultiSelect = selectedAlbums => {
    const values = selectedAlbums ? selectedAlbums.map(item => item.value) : []
    handleChange({ target: { name: 'albums', value: values } })
  }

  const handleSelect = selectedAlbum => {
    handleChange({ target: { name: 'album', value: selectedAlbum.value } })
  }

  const handleCreateAlbum = async () => {
    try {
      const res = await createAlbum({ ...formdata, lenght: 0 })
      console.log(res)
      setHasAlbum(true)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const toggleCreateAlbumForm = props => {
    const albumArray = albums.map(album => album.label)
    if (!albumArray.includes(props)) {
      handleChange({ target: { name: 'name', value: props } })
      setHasAlbum(false)
    }
  }
  console.log(formdata)
  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          <form onSubmit={handleSubmit}>
            <label className="label has-text-centered">Select Album</label>
            {hasAlbum ?
              (
                <div className="field">
                  <div className="control">
                    <label className="label">Albums</label>
                    <Creatable options={albums} isMulti onChange={handleMultiSelect} onCreateOption={toggleCreateAlbumForm} />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p>Album does not exist, fill form below:</p>
                  </div>
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
                      <label className="label">Year</label>
                      <input
                        className="input"
                        type="date"
                        placeholder="About Album"
                        name="about"
                        onChange={handleChange}
                        value={formdata.year}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Cover</label>
                      <ImageUpload onUpload={handleUpload} />
                    </div>
                  </div>
                </>
              )}
            <div className="field">
              {hasAlbum ? <button className="button is-fullwidth is-dark" type="submit">
                Submit
              </button> : <button className="button is-fullwidth is-warning" type="button" onClick={handleCreateAlbum}>Create This Album</button>}

            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AlbumForm