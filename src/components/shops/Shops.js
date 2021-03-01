import {useEffect, useState} from "react";
import ShopService from "../../services/ShopService";

export default function Shops() {
    const[shops, setShops] = useState([]);
    const {getShops} = ShopService();
    useEffect(()=>{
      getShops().then(value => setShops( value.data))
    },[])

  return (
    <div>
        Shops
        {shops.map(value => <div>{value.name}-{value.id}</div>)}
    </div>
  );
}
