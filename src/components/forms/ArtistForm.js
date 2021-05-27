import { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'

import useForm from '../../hooks/useForm.js'
import { createArtist, getAllArtists } from '../../lib/api.js'
import ImageUpload from '../upload/ImageUpload.js'


function ArtistForm({ selectedArtists, setSelectedArtists }) {
  const [artists, setArtists] = useState(null)
  const [hasArtist, setHasArtist] = useState(true)

  const { formdata, handleChange } = useForm({
    name: '',
    about: '',
    cover: ''
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const resArtists = await getAllArtists()
        const convertedArtists = resArtists.data.map(artist => {
          return {
            value: artist._id,
            label: artist.name
          }
        })
        setArtists(convertedArtists)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [hasArtist])

  const handleUpload = (files) => {
    handleChange({ target: { name: 'cover', value: files } })
  }

  const handleSubmit = event => {
    event.preventDefault()

    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }

  const handleMultiSelect = selectedArtists => {
    const values = selectedArtists ? selectedArtists.map(item => item.value) : []
    setSelectedArtists(selectedArtists)
  }

  const handleSelect = selectedAlbum => {
    handleChange({ target: { name: 'album', value: selectedAlbum.value } })
  }

  const handleCreateArtist = async () => {
    try {
      const res = await createArtist(formdata)
      console.log(res)
      setHasArtist(true)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleCreateArtistForm = props => {
    const artistsArray = artists.map(artist => artist.label)
    if (!artistsArray.includes(props)) {
      handleChange({ target: { name: 'name', value: props } })
      setHasArtist(false)
    }
  }
  return (
    <>
      <label className="label has-text-centered">Select Artist</label>
      {hasArtist ?
        (
          <div className="field">
            <div className="control">
              <label className="label">Artists</label>
              <Creatable options={artists} isMulti onChange={handleMultiSelect} onCreateOption={toggleCreateArtistForm} />
            </div>
          </div>
        ) : (
          <>
            <div>
              <p>Artist does not exist, fill form below:</p>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Name</label>
                <input
                  className="input"
                  placeholder="Artist Name"
                  name="name"
                  onChange={handleChange}
                  value={formdata.name}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">About</label>
                <input
                  className="input"
                  placeholder="About Artist"
                  name="about"
                  onChange={handleChange}
                  value={formdata.about}
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
        {hasArtist ? '' : <button className="button is-fullwidth is-warning" type="button" onClick={handleCreateArtist}>Create This Artist</button>}

      </div>
    </>
  )
}

export default ArtistForm