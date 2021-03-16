import axios from "axios";
export const AXIOS = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
})
