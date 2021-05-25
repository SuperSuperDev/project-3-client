import React from 'react'

export function setPlaylist(playlistData) {
  const [nowPlayingList, setNowPlayingList] = React.useState(playlistData)
  const replaceNowPlaying = () => {
    setNowPlayingList({ ...nowPlayingList })
  }

  return {
    nowPlayingList,
    replaceNowPlaying,
  }
}