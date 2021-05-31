import PlaylistCard from './PlaylistCard'

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
            <>
              <p>Loading ... ...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlaylistGrid
