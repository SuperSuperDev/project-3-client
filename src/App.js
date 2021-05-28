import React, { useState, createContext } from 'react'

import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SongsIndex from './components/song/SongsIndex'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AlbumIndex from './components/album/AlbumIndex'
import ShowAlbum from './components/album/ShowAlbum'
import PlaylistIndex from './components/Playlist/PlaylistIndex'
import ShowPlaylist from './components/Playlist/ShowPlaylist'
import Player from './components/player/Player'
import SongForm from './components/forms/SongForm'
import NewAlbumForm from './components/forms/NewAlbumForm'
import NewPlaylistForm from './components/forms/NewPlaylistForm'
import UserDashboard from './components/dashboard/UserDashboard'

export const AudioQueueContext = createContext(null)

function App() {
  const [audioQueue, setAudioQueue] = useState(null)

  const updateAudioQueue = (song, playnow) => {
    if (!audioQueue) {
      setAudioQueue(song)
    } else {
      if (playnow) {
        setAudioQueue([...song, ...audioQueue])
      } else {
        setAudioQueue([...audioQueue, ...song])
      }
    }
  }

  return (
    <>
      <BrowserRouter>
        <AudioQueueContext.Provider value={{ audioQueue, updateAudioQueue }}>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/songs" component={SongsIndex} />
            <Route exact path="/albums/new" component={NewAlbumForm} />
            <Route path="/albums/:albumId" component={ShowAlbum} />
            <Route path="/albums" component={AlbumIndex} />
            <Route exact path="/playlist/new">
              <NewPlaylistForm />
            </Route>
            <Route path="/playlists/:playlistId" component={ShowPlaylist} />
            <Route path="/playlists" component={PlaylistIndex} />
            <Route path="/upload-song" component={SongForm} />
            <Route path="/create-album" component={NewAlbumForm} />
            <Route path="/create-playlist" component={NewPlaylistForm} />
            <Route path="/dashboard" component={UserDashboard} />
          </Switch>
          <Player audioQueue={audioQueue} />
        </AudioQueueContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App

// <Route path="/player" component={Player} />