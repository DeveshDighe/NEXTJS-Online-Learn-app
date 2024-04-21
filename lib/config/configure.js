import axios from "axios";

const jwt = localStorage.getItem('MyToken');

export const API_BASE_URL= 'http://localhost:3000/'

export const api = axios.create({
  baseURL : API_BASE_URL,
  headers:{
    'Authorization': jwt ? `Bearer ${jwt}` : null,
        'Content-Type': 'application/json'
  }
})