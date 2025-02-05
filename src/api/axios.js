import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*'
  },
  withCredentials: true
});

export default instance;