import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import Loading from './Loading'
import NotFound from './Notfound'
import { Link } from 'react-router-dom';

export default function Brand() {

  function getBrand(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let {data,isLoading,error,isError} = useQuery({queryKey:['getBrand'],queryFn:getBrand,select:(data)=>(data?.data)})
  
  if(isLoading)
    return <Loading></Loading>

  if(isError)
    return <NotFound></NotFound>
  console.log(data);
  return (
    <div className='container flex flex-wrap gap-4 justify-center py-10'>
      {data?.data?.map(ele=><div key={ele?._id} className='cursor-pointer shadow-lg m-3'>
        <Link to={`/productbrand/${ele?._id}`} ><img src={ele?.image} className='w-full ' alt=""/></Link>
      </div>)}
    </div>
  )
}
