function PlayBtn(props) {


  const handleClick = () => {
    // console.log('here in play src', musicSrc)
    // console.log('here in play cover', cover)
    // console.log('here in play singer', singer)
    // console.log('here in play name', name)
    // console.log('here in play type', type)
    const song = {
      name: props.name,
      singer: props.singer.name,
      cover: props.cover,
      musicSrc: props.musicSrc,
    }

    props.updateAudioQueue(song)

  }
  return (
    <button className="button" onClick={handleClick}>▶️</button>
  )
}

export default PlayBtn