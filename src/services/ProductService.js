
import AXIOS from "./Axios.config";

export default function ProductService() {

    return {
        getAll: () => {
            const data = AXIOS.get('/products');
            return data;
        }
    }
}

