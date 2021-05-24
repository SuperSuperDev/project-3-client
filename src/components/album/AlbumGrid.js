import AlbumCard from './AlbumCard'
function AlbumGrid({ albumList }) {
  console.log('albumList: ', albumList)
  return (
    
    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {albumList ? (
            albumList.map((album) => (
              <>
                <AlbumCard key={album._id} { ...album } />
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

export default AlbumGrid
