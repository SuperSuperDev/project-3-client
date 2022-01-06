import AlbumCard from './AlbumCard'
import Loader from 'react-loader-spinner'


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

export default AlbumGrid
