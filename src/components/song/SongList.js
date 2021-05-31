import SongListItem from './SongListItem'

function SongList({ songList }) {
  const filteredSongList = songList?.filter(song => !song.isDeleted)
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {filteredSongList ? (
            filteredSongList.map((song) => (
              <>
                <SongListItem key={song._id} {...song} />
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

export default SongList
