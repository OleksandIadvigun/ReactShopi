import {AXIOS} from "./Axios.config";

class ProductService {
    getFe(){
       return fetch('http://localhost:8080/product').then(value => value.json());
    }

    async getAll(){
        const data = await AXIOS.get('/product');
        return  data;
    }
}

export const productService = new ProductService();

export const getProducts = () => {
    return productService.getAll();
}
export const getFe = () => {
    return productService.getFe();
}

