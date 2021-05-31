import PlaylistCard from './PlaylistCard'
import Loader from 'react-loader-spinner'

function PlaylistGrid({ playlistList }) {
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {playlistList ? (
            playlistList.map((playlist) => (
              <div key={playlist._id} className="column is-one-quarter-desktop is-one-third-tablet">
                <PlaylistCard  {...playlist} />
              </div>
            ))

          ) : (
            <div id="loader">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlaylistGrid
