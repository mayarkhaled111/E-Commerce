import axios from "axios"

let baseUrl = `https://ecommerce.routemisr.com/api/v1`
let token = localStorage.getItem('userToken')

// add to cart

export function addToCartApi(productId){
     return axios.post(`${baseUrl}/cart`,{productId},{headers:{token}
    })
}

// display all items
export function getCartApi(){
    if (token){
    return axios.get(`${baseUrl}/cart`,{headers:
        {
        token
        }
    })
}
}
// delete items
export function delCartApi(id){
    return axios.delete(`${baseUrl}/cart/${id}`,{headers:
        {
        token
        }
    })
}

// update into cart
export function updateCartApi({id,count}){
    return axios.put(`${baseUrl}/cart/${id}`,{count},{headers:{token}
   })
}

export function clearCartApi(){
    return axios.delete(`${baseUrl}/cart`,{headers:
        {
        token
        }
    })
}