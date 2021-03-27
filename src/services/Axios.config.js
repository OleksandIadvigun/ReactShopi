import axios from "axios";
export default function AXIOS () {
    const AX = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    return AX;
}
