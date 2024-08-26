import axios from "axios";

let token = localStorage.getItem('userToken')

// to extract ID from Token
let userId = null;
if (token) {
  // Extract ID from token
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));
  userId = decodedPayload.id;
}

export default function checkout({cardId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=https://mayarkhaled111.github.io/E-Commerce/#`,{shippingAddress},{headers:{token}})
}

export function payCash({cardId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,{shippingAddress},{headers:{token}})
}



export function getAllOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
}


