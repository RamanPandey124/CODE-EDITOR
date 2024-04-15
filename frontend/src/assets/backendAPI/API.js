import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:1100' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('_auth')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('_auth')}`
    }
    return req
})

export default API