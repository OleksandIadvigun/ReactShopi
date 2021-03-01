import {AXIOS} from "./Axios.config";


export default function ShopService() {
  return {
   getShops: () => {
       console.log("in getShops");
       return AXIOS.get('/shop');
   }
};
}
