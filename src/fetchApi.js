import axios from 'axios'

export const fetchApi = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  withCredentials: true,
})
