import PlaylistCard from './PlaylistCard'

function PlaylistGrid({ playlistList }) {
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {playlistList ? (
            playlistList.map((playlist) => (
              <>
                <PlaylistCard key={playlist._id} { ...playlist } />
              </>
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
