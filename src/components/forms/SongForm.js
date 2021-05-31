import { useEffect,  useState } from 'react'
import Creatable from 'react-select/creatable'

import useForm from '../../hooks/useForm.js'
import { addAlbumToArtist, addArtistToAlbum, addSongToAlbum, addSongToArtist, createSong, getAllSongs } from '../../lib/api.js'
import AudioUpload from '../upload/AudioUpload.js'
import ImageUpload from '../upload/ImageUpload.js'
import AlbumForm from './AlbumForm.js'
import ArtistForm from './ArtistForm.js'


function SongForm() {
  const [songs, setSongs] = useState(null)

  const [selectedArtists, setSelectedArtists] = useState(null)
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  const { formdata, handleChange } = useForm({
    name: '',
    genre: '',
    singer: '',
    cover: '',
    year: '',
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const resSongs = await getAllSongs()
        const convertedSongs = resSongs.data.map(song => {
          return {
            value: song._id,
            label: song.name
          }
        })
        setSongs(convertedSongs)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const handleUploadImage = (files) => {
    handleChange({ target: { name: 'cover', value: files } })
  }
  const handleUploadAudio = (files) => {
    handleChange({ target: { name: 'musicSrc', value: files } })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
    try {
      const artistsArray = selectedArtists ? selectedArtists.map(item => item.value) : []
      const res = await createSong({ ...formdata, artists: artistsArray, album: selectedAlbum.value })
      console.log(res.data)
      await addSongToAlbum(selectedAlbum.value, res.data._id)
      await addSongToArtist(res.data.singer, res.data._id)
      await addAlbumToArtist(res.data.singer, selectedAlbum.value)
      await addArtistToAlbum(selectedAlbum.value, res.data.singer)
      await addSongToAlbum(selectedAlbum.value, res.data._id)
      console.log('success')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleSelect = selectedArtist => {
    handleChange({ target: { name: 'singer', value: selectedArtist.value } })
  }

  console.log(formdata)
  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile box">
          <form onSubmit={handleSubmit}>
            <ArtistForm selectedArtists={selectedArtists} setSelectedArtists={setSelectedArtists} />
            <AlbumForm setSelectedAlbum={setSelectedAlbum} selectedAlbum={selectedAlbum} />
            <label className="label has-text-centered">Select Song</label>
            <div className="field">
              <div className="control">
                <label className="label">Name</label>
                <input
                  className="input"
                  placeholder="song Name"
                  name="name"
                  onChange={handleChange}
                  value={formdata.name}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Genre</label>
                <input
                  className="input"
                  placeholder="Song Genre"
                  name="genre"
                  onChange={handleChange}
                  value={formdata.genre}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Lead Artist</label>
                <Creatable options={selectedArtists} onChange={handleSelect} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Year Released</label>
                <input
                  className="input"
                  type="date"
                  placeholder="Year released"
                  name="year"
                  onChange={handleChange}
                  value={formdata.year}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Cover</label>
                <ImageUpload onUpload={handleUploadImage} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Audio File</label>
                <AudioUpload onUpload={handleUploadAudio} />
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

export default SongForm