import SongListItem from './SongListItem'
function SongList({ songList, ...props  }) {
  console.log('songList: ', songList)
  return (

    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {songList ? (
            songList.map((song) => (
              <>
                <SongListItem key={song._id} {...song} {...props}  />
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
