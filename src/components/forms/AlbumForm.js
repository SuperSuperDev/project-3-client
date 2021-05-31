import Creatable from 'react-select/creatable'
import useForm from '../../hooks/useForm.js'
import ImageUpload from '../upload/ImageUpload.js'
import { useEffect, useState } from 'react'
import { createAlbum, getAllAlbums } from '../../lib/api.js'

function AlbumForm({ setSelectedAlbum }) {
  const [albums, setAlbums] = useState(null)
  const [hasAlbum, setHasAlbum] = useState(true)
  const { formdata, handleChange } = useForm({
    name: '',
    about: '',
    cover: '',
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const resAlbums = await getAllAlbums()
        const convertedAlbums = resAlbums.data.map(album => {
          return {
            value: album._id,
            label: album.name,
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

  const handleSelect = selectedAlbum => {
    setSelectedAlbum(selectedAlbum)
  }

  const handleCreateAlbum = async () => {
    try {
      await createAlbum({ ...formdata, length: 0 })
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
  
  return (
    <>
      <label className="label has-text-centered">Select Album</label>
      {hasAlbum ?
        (
          <div className="field">
            <div className="control">
              <label className="label">Albums</label>
              <Creatable options={albums} onChange={handleSelect} onCreateOption={toggleCreateAlbumForm} />
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
                  placeholder="Year Album released"
                  name="year"
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
        {hasAlbum ? '' : <button className="button is-fullwidth is-warning" type="button" onClick={handleCreateAlbum}>Create This Album</button>}
      </div>
    </>
  )
}

export default AlbumForm