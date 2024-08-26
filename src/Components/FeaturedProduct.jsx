import React, { useEffect, useState } from 'react'
import { getProducts } from '../APIS/allProducts'
import { data } from 'autoprefixer';
import Item from './Item';
import Loading from './Loading';
import Notfound from './Notfound';

export default function FeaturedProduct({arr}) {
    let [productsArr,setProductsArr] = useState([])
    let [msg,setMsg] = useState('')
    let [loading,setLoading] = useState(false)
    
    async function allProducts(){
        setLoading(true)
        let data = await getProducts()
        if(data?.data){
            setProductsArr(data?.data)
            setLoading(false)
            setMsg('')
        } else{
            setMsg(data)
            setLoading(false)
        }
    }
    useEffect(()=>{
     allProducts()
    },[])

   if(loading)
    return <Loading></Loading>

   if(msg)
    return <Notfound></Notfound>

  return (
    <div className='container flex flex-wrap mt-5'>
        {arr?.length?arr.map(prod=> <Item key={prod?._id} ele={prod}></Item>):productsArr.map(prod=> <Item key={prod?._id} ele={prod}></Item>)}
    </div>
  )
}
