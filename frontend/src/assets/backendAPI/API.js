import axios from "axios";

const API = axios.create({baseURL:'http://localhost:1100'})

// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('token')){
//         req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     }
//     return req
// })

export default API