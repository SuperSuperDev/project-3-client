import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Cheese Requests

export function getAllSongs() {
  return axios.get(`${baseUrl}/songs`)
}

export function getSingleCheese(cheeseId) {
  return axios.get(`${baseUrl}/cheeses/${cheeseId}`)
}

export function createCheese(formdata) {
  return axios.post(`${baseUrl}/cheeses`, formdata, headers())
}

export function editCheese(id, formdata) {
  return axios.put(`${baseUrl}/cheeses/${id}`, formdata, headers())
}

export function deleteCheese(id) {
  return axios.delete(`${baseUrl}/cheeses/${id}`, headers())
}


// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}
