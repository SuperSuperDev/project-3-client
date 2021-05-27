import React, { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'

import ImageUpload from '../upload/ImageUpload.js'
import AudioUpload from '../upload/AudioUpload.js'

import useForm from '../../hooks/useForm.js'
import { getAllAlbums, getAllArtists } from '../../lib/api.js'



function Form() {

  const [artists, setArtists] = useState(null)
  const [albums, setAlbums] = useState(null)

  const [createArtist, setCreateArtist] = useState(false)

  const [valueOfNewArtist, setValueOfNewArtist] = useState(null)

  const { formdata: songdata, handleChange: handleSongChange } = useForm({
    cover: '',
    artists: [],
    album: '',
  })
  const { formdata: artistdata, handleChange: handleArtistChange } = useForm({
    cover: '',
    artists: [],
    album: '',
  })
  const { formdata: albumdata, handleChange: handleAlbumChange } = useForm({
    cover: '',
    artists: [],
    album: '',
  })
  console.log(songdata)
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
  }, [])

  const handleUpload = (files) => {
    handleChange({ target: { name: 'cover', value: files } })
  }

  const handleSubmit = event => {
    event.preventDefault()

    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
  }

  const handleMultiSelect = selectedArtists => {
    const values = selectedArtists ? selectedArtists.map(item => item.value) : []
    handleSongChange({ target: { name: 'artists', value: values } })
  }

  const handleSelect = selectedAlbum => {
    handleChange({ target: { name: 'album', value: selectedAlbum.value } })
  }

  const handleCreateArtist = props => {
    setValueOfNewArtist(props)
    setCreateArtist(true)
  }



  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          <form onSubmit={handleSubmit}>
            <label className="label has-text-centered">Artist</label>
            <div className="field">
              <div className="control">
                <label className="label">Name</label>
                {!valueOfNewArtist ?
                  <Creatable options={artists} isMulti onChange={handleMultiSelect} onCreateOption={handleCreateArtist} />
                  :
                  <Creatable options={artists} isMulti onChange={handleMultiSelect} onCreateOption={handleCreateArtist} value={valueOfNewArtist} />
                }

              </div>
            </div>
            {createArtist &&
              <div className="field">
                <div className="control">
                  <label className="label">About</label>
                  <input className="input" placeholder="About Artist" name="about" onChange={handleArtistChange} />
                </div>
              </div>
            }

            <div className="field">
              <div className="control">
                <label className="label">Albums</label>
                <Creatable options={albums} onChange={handleSelect} />
              </div>
            </div>
            <div className="field">
              <ImageUpload
                onUpload={handleUpload}
              />
            </div>
            <div className="field">
              <AudioUpload
                onUpload={handleUpload}
              />
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



export default Form