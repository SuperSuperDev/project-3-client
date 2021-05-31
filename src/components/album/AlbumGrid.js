import AlbumCard from './AlbumCard'

function AlbumGrid({ albumList }) {
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {albumList ? (
            albumList.map((album) => (
              <div key={`grid-${album._id}`} className="column is-one-quarter-desktop is-one-third-tablet">
                <AlbumCard {...album} />
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

export default AlbumGrid
