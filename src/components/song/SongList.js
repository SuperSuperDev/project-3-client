import SongListItem from './SongListItem'
import Loader from 'react-loader-spinner'

function SongList({ songList }) {
  const filteredSongList = songList?.filter(song => !song.isDeleted)
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {filteredSongList ? (
            filteredSongList.map((song) => (
              <div key={song._id} className="column is-full">
                <SongListItem  {...song} />
              </div>
            ))
          ) : (
            <div id="loader">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={150}
                width={150}
                timeout={3000} //3 secs
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SongList
