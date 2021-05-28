import SongListItem from './SongListItem'
function SongList({ songList, setAudioQueue, audioQueue }) {
  console.log('songList: ', songList)
  return (

    <div className="container">
      <div className="section">
        <div className="columns is-multiline">
          {songList ? (
            songList.map((song) => (
              <>
                <SongListItem key={song._id} {...song} setAudioQueue={setAudioQueue} audioQueue={audioQueue} />
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
