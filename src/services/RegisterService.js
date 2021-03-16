import axios from "axios";


export default function RegisterService() {
    return {
        sendNewUser: (data) => {
            return axios.post('http://localhost:8080/registration', data);
        },
        checkLoginAndEmail: (data) => {
            return axios.post('http://localhost:8080/checkloginAndEmail', data);
        }
    }
}
