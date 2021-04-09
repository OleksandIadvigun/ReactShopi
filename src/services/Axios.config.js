import axios from "axios";
export default function AXIOS () {
    return {
        ax: ()=> {
          const axe =   axios.create({
                baseURL: 'http://localhost:8080',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            return axe;
        }
    }
}
