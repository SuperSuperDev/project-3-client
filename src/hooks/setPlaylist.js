import React from 'react'

export function setPlaylist(playlistData) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nowPlayingList, setNowPlayingList] = React.useState(playlistData)
  const replaceNowPlaying = () => {
    setNowPlayingList({ ...nowPlayingList })
  }

  return {
    nowPlayingList,
    replaceNowPlaying,
  }
}