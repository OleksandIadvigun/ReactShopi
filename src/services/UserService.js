import {AXIOS} from "./Axios.config";

export default function UserService() {
    return {
        editUser: (data) => {
            return AXIOS.put('http://localhost:8080/user/edit', data);
        }
    }
}
