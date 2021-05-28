import React, { useState } from 'react'

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



function App() {
  const [audioQueue, setAudioQueue] = useState(null)
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/songs">
            <SongsIndex audioQueue={audioQueue} setAudioQueue={setAudioQueue} />
          </Route>
          <Route exact path="/albums/new">
            <NewAlbumForm />
          </Route>
          <Route path="/albums/:albumId">
            <ShowAlbum audioQueue={audioQueue} setAudioQueue={setAudioQueue} />
          </Route>
          <Route path="/albums" component={AlbumIndex} />
          <Route exact path="/playlist/new">
            <NewPlaylistForm />
          </Route>
          <Route path="/playlists/:playlistId" component={ShowPlaylist} />
          <Route path="/playlists" component={PlaylistIndex} />
          <Route path="/upload-song" component={SongForm} />
        </Switch>
        <Player audioQueue={audioQueue} />
      </BrowserRouter>
    </>
  )
}

export default App

// <Route path="/player" component={Player} />