import axios from "axios"

let baseUrl = `https://ecommerce.routemisr.com/api/v1`
let token = localStorage.getItem('userToken')

// add to wishList
export function addToWishListApi(productId){
     return axios.post(`${baseUrl}/wishlist`,{productId},{headers:{token}
    })
}

export function getWishListApi(){
    if(token){
    return axios.get(`${baseUrl}/wishlist`,{headers:
        {
        token
        }
    })
}}


// delete items
export function delListApi(id){
    return axios.delete(`${baseUrl}/wishlist/${id}`,{headers:
        {
        token
        }
    })
}

