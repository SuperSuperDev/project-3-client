import React from 'react'

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

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/songs" component={SongsIndex} />
          <Route path="/albums/:albumId" component={ShowAlbum} />
          <Route path="/albums" component={AlbumIndex} />
          <Route path="/playlists/:playlistId" component={ShowPlaylist} />
          <Route path="/playlists" component={PlaylistIndex} />          
        </Switch>
        <Player />
      </BrowserRouter>
    </>
  )
}

export default App

// <Route path="/player" component={Player} />