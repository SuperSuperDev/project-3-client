import SongListItem from './SongListItem'

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
            <>
              <p>Loading ... ...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SongList
