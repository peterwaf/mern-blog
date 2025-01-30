// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Backend URL
//   // baseURL: 'https://mern-simple-blog-app.vercel.app/api', // Backend URL
// });

// // Attach token to requests if available
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

const API = "http://localhost:5000/api";

export default API;
