import axios from "axios";

let token = localStorage.getItem('userToken')

// to extract ID from Token
const payload = token.split('.')[1];
const decodedPayload = JSON.parse(atob(payload));
const userId = decodedPayload.id;

export default function checkout({cardId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5173`,{shippingAddress},{headers:{token}})
}

export function payCash({cardId,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,{shippingAddress},{headers:{token}})
}



export function getAllOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
}

// export function getAllOrders(){
//     if (token) {
//         try {
//             const payload = token.split('.')[1];
//             const decodedPayload = JSON.parse(atob(payload));
//             const userId = decodedPayload
//             if (userId) {
//                 return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
//             } else {
//                 return Promise.reject("User ID is not found in the token.");
//             }
//         } catch (error) {
//             return Promise.reject("Failed to decode token: " + error.message);
//         }
//     }
// }