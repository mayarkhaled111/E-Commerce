import axios from "axios";
import { CategoryScale } from "chart.js";

export async function getProducts(){
   try {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
     return data;
   } catch (error) {
    return error?.message
   }
}

export async function getRelatedProduct(categoryId){
   try {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
     return data;
   } catch (error) {
    return error?.message
   }
}
export async function getRelatedBrand(Id){
   try {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${Id}`)
     return data;
   } catch (error) {
    return error?.message
   }
}