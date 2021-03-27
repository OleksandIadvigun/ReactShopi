import AXIOS from "./Axios.config";

export default function UserService() {
    return {
        editUser: (data) => {
            return AXIOS.put('/user/edit', data);
        }
    }
}
