import React from 'react'
import { AudioQueueContext } from '../../App.js'

function PlayBtn(props) {
  const { updateAudioQueue } = React.useContext(AudioQueueContext)
  const handleClick = () => {
    const song = {
      name: props.name,
      singer: props.singer.name,
      cover: props.cover,
      musicSrc: props.musicSrc,
    }
    updateAudioQueue([song])
  }
  
  return (
    <button className="button" onClick={handleClick}>▶️</button>
  )
}

export default PlayBtn