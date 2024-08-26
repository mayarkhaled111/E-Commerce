import React, { useEffect, useState } from 'react'
import { getCategories } from '../APIS/getCategories'
import Loading from './Loading'
import Notfound from './Notfound'
import FeaturedProduct from './FeaturedProduct'
import Slider from "react-slick";
import { getRelatedProduct } from '../APIS/allProducts';

export default function Categories() {
  let[catArr,setCatArr] = useState([])
  let[relatedArr,setRelatedArr] = useState([])
  let[msg,setMsg] = useState('')
  let [loading,setLoading] = useState(false)


  async function getCategoriesApi(){
    setLoading(true)
    let data = await getCategories()
    if(data?.data){
      setCatArr(data?.data)
      setLoading(false)
      setMsg('')
  } else{
      setMsg(data)
      setLoading(false)
  }
  }

useEffect(()=>{
  getCategoriesApi()
},[])

if(loading)
  return <Loading></Loading>

if(msg)
  return <Notfound></Notfound>


async function gatData(id) {
  let data = await getRelatedProduct(id)
  setRelatedArr(data?.data)
}
  return (
   <div className='flex'>
   
   <ul className='w-[250px] bg-main-light flex flex-col items-center border border-green'>
   {catArr.map(ele=> <li className='cursor-pointer py-6 px-4' onClick={()=>gatData(ele?._id)} key={ele?._id}>{ele?.name}</li>)}
   </ul>
   <FeaturedProduct arr={relatedArr}></FeaturedProduct>
   </div>
    

);
  
}