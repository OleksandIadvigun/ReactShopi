import axios from "axios";


export default function AuthService() {
    return {
        LogIn: (data) => {
            return axios.post('http://localhost:8080/auth',data);
        }
    }
}
