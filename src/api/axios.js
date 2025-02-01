import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://mars-crew.shop:26080',
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: false
});

export default instance; 