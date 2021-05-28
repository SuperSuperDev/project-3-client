function PlayBtn({ setAudioQueue, audioQueue, type, name, singer, cover, musicSrc }) {


  const handleClick = () => {
    // console.log('here in play src', musicSrc)
    // console.log('here in play cover', cover)
    // console.log('here in play singer', singer)
    // console.log('here in play name', name)
    // console.log('here in play type', type)
    const song = {
      name: name,
      singer: singer,
      cover: cover,
      musicSrc: musicSrc,
    }
    if (!audioQueue) {
      setAudioQueue([song])
    }
  }

  return (
    <button className="button" onClick={handleClick}>▶️</button>
  )
}

export default PlayBtn