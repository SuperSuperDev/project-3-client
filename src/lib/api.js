import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Song Requests

export function getAllSongs() {
  return axios.get(`${baseUrl}/songs`)
}

export function getSingleSong(songId) {
  return axios.get(`${baseUrl}/songs/${songId}`)
}

export function createSong(formdata) {
  return axios.post(`${baseUrl}/songs`, formdata, headers())
}

export function editSong(id, formdata) {
  return axios.put(`${baseUrl}/songs/${id}`, formdata, headers())
}

export function deleteSong(id) {
  return axios.delete(`${baseUrl}/songs/${id}`, headers())
}

// * Album Requests
// TODO: Comments Routes
export function getAllAlbums() {
  return axios.get(`${baseUrl}/albums`)
}

export function getSingleAlbum(albumId) {
  return axios.get(`${baseUrl}/albums/${albumId}`)
}

export function createAlbum(formdata) {
  return axios.post(`${baseUrl}/albums`, formdata, headers())
}

export function editAlbum(id, formdata) {
  return axios.put(`${baseUrl}/albums/${id}`, formdata, headers())
}

export function deleteAlbum(id) {
  return axios.delete(`${baseUrl}/albums/${id}`, headers())
}

export function addSongToAlbum(albumId, songId) {
  return axios.post(`${baseUrl}/albums/${albumId}/songs/${songId}`, null, headers())
}

export function addArtistToAlbum(albumId, artistId) {
  return axios.post(`${baseUrl}/albums/${albumId}/artists/${artistId}`, null, headers())
}

// * Playlists

export function getAllPlaylists() {
  return axios.get(`${baseUrl}/playlist`)
}

export function getSinglePlaylist(playlistId) {
  return axios.get(`${baseUrl}/playlist/${playlistId}`)
}

export function createPlaylist(formdata) {
  return axios.post(`${baseUrl}/playlist/`, formdata, headers())
}

export function removePlaylist(playlistId) {
  return axios.delete(`${baseUrl}/playlist/${playlistId}`, headers())
}

// * Artist
export function getAllArtists() {
  return axios.get(`${baseUrl}/artists`)
}

export function createArtist(data) {
  return axios.post(`${baseUrl}/artists/`, data, headers())
}

export function addSongToArtist(artistId, songId) {
  return axios.post(`${baseUrl}/artists/${artistId}/songs/${songId}`, null, headers())
}

export function addAlbumToArtist(artistId, albumId) {
  return axios.post(`${baseUrl}/artists/${artistId}/albums/${albumId}`, null, headers())
}

// * Comments

export function getCommentsForSong(songId){
  return axios.get(`${baseUrl}/songs/${songId}/comments`)
}

export function addCommentToSong(formdata, songId){
  return axios.post(`${baseUrl}/songs/${songId}/comments`,formdata, headers())
}

export function editCommentInSong(formdata, songId, commentId){
  return axios.put(`${baseUrl}/songs/${songId}/comments/${commentId}`,formdata, headers())
}

export function deleteCommentInSong(songId, commentId){
  return axios.delete(`${baseUrl}/songs/${songId}/comments/${commentId}`, headers())
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}
export function addLike(type, id, plusOrMinus) {
  return axios.post(`${baseUrl}/like/${type}/${id}/${plusOrMinus}`, null, headers())
}