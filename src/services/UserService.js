import AXIOS from "./Axios.config";
import axios from "axios";

export default function UserService() {
    const AX = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    return {
        editUser: (data) => {
            return AX.put('/user/edit', data);
        }
    }
}
