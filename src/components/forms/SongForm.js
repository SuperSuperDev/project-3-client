import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Creatable from 'react-select/creatable'
import useForm from '../../hooks/useForm.js'
import { createSong, getAllSongs } from '../../lib/api.js'
import AudioUpload from '../upload/AudioUpload.js'
import ImageUpload from '../upload/ImageUpload.js'
import AlbumForm from './AlbumForm.js'
import ArtistForm from './ArtistForm.js'

function SongForm() {
  // eslint-disable-next-line no-unused-vars
  const [songs, setSongs] = useState(null)
  const history = useHistory()
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
            label: song.name,
          }
        })
        setSongs(convertedSongs)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [setSongs])


  const handleUploadImage = (files) => {
    handleChange({ target: { name: 'cover', value: files } })
  }
  const handleUploadAudio = (files) => {
    handleChange({ target: { name: 'musicSrc', value: files } })
  }


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const artistsArray = selectedArtists ? selectedArtists.map(item => item.value) : []
      await createSong({ ...formdata, artists: artistsArray, album: selectedAlbum.value })
      history.push('/songs')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleSelect = selectedArtist => {
    handleChange({ target: { name: 'singer', value: selectedArtist.value } })
  }

  return (
    <main className="section">
      <div className="columns is-mobile">
        <div className="column is-4-tablet is-offset-4-tablet is-8-mobile is-offset-2-mobile box">
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
              <button className="button is-fullwidth is-warning" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main >
  )
}

export default SongForm