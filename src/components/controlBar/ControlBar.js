import React from 'react'
import PlayBtn from './PlayBtn'
import PlaylistBtn from './PlaylistBtn'
import LikeBtn from './LikeBtn'

function ControlBar({ id, type, likesCount, setAudioQueue, audioQueue, name, cover, singer, musicSrc }) {
  return (
    <div className="field is-grouped has-addons">
      <div className="buttons">
        <PlaylistBtn />
        <PlayBtn
          setAudioQueue={setAudioQueue}
          audioQueue={audioQueue}
          type={type}
          id={id}
          cover={cover}
          name={name}
          singer={singer}
          musicSrc={musicSrc} />
        < LikeBtn id={id} type={type} likesCount={likesCount} />
      </div>
    </div>
  )
}

export default ControlBar
