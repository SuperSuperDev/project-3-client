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
// * Playlists

export function getAllPlaylists() {
  return axios.get(`${baseUrl}/playlist`)
}

export function getSinglePlaylist(playlistId) {
  return axios.get(`${baseUrl}/playlist/${playlistId}`)
}

export function getAllArtists() {
  return axios.get(`${baseUrl}/artists`)
}

export function createArtist(data) {
  return axios.post(`${baseUrl}/artists/`, data, headers())
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}
