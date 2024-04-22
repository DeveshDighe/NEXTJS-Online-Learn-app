import axios from "axios";
import Cookies from "js-cookie";

// Get JWT token from cookies
const jwt = Cookies.get("MyToken");

const NODE_ENV = 'production'

// Define base URLs for development and production
const devBaseUrl = 'http://localhost:3000/';
const prodBaseUrl = 'https://nextjs-online-learn-app.vercel.app/';


// Determine base URL based on environment
const API_BASE_URL = NODE_ENV === 'production' ? prodBaseUrl : devBaseUrl;

// Create axios instance with appropriate headers
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': jwt ? `Bearer ${jwt}` : null,
    'Content-Type': 'application/json'
  }
});
