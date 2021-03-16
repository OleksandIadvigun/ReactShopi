import {AXIOS} from "./Axios.config";

export default function AuthService() {
    return {
        LogIn: (data) => {
            return AXIOS.post('auth',data);
        }
    }
}
