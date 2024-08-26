import React, { useEffect, useLayoutEffect, useState } from 'react'
import { json, Link } from 'react-router-dom'
import useMutationCart from './Hooks/useMutationCart'
import { addToCartApi } from '../APIS/allCartApis';
import { toast } from 'react-toastify';
import useMutationWishList from './Hooks/useMutaionWishList';
import { addToWishListApi, delListApi, getWishListApi} from '../APIS/AllWishListApis';
import useQueryWishList from './Hooks/useQueryWishList';



export default function Item({ ele }) {
  let {mutate:addMutate,status,data} = useMutationCart(addToCartApi)
  let { data:wishData, isLoading, isError } = useQueryWishList('proInList', getWishListApi)
  let {mutate:addToList,data:datamutate} = useMutationWishList(addToWishListApi)
  let [toggle,setToggle] = useState(false)
  let { mutate: delItem ,isPending:delProduct} = useMutationWishList(delListApi)

  // to show message to know that product was added
  useEffect(() => {
    if(status === 'success') {
      toast.success(data?.data?.message);
    }
  }, [status, data]);

  // add product id to localStorage and keep icon solid if i add product to wish list
  useEffect(() => {
    const savedIconState = localStorage.getItem(`${ele?._id}`);
    if (savedIconState) {
      setToggle(JSON.parse(savedIconState));
    }
  }, [ele?._id]);
  const toggleIcon = (id) => {
    const newIconState = !toggle;
    setToggle(newIconState);
    localStorage.setItem(`${id}`, JSON.stringify(newIconState));
    if (newIconState) {
      addToList(id);
      toast.success('Product added to wish list');
    } else {
      delItem(id);
      localStorage.removeItem(`${id}`);
      toast.success('Product removed from wish list');
    }
  };



  return (
    <div className='product md:w-1/6 sm:w-1/2 my-5 cursor-pointer overflow-hidden relative' >
        <div className='p-5 '>
      <Link to={`/productDetails/${ele?._id}/${ele?.category?._id}`}>
          <img src={ele.imageCover} className='w-full' alt="Image Cover" />
          <h2 className='text-green-500 py-2'>{ele?.category?.name}</h2>
          <p className='text-gray-500 line-clamp-1'>{ele?.title}</p>
          <div className='flex justify-between'>
            <p>{ele?.price} EGP</p>
            <div className='flex gap-1'>
              <p>{ele?.ratingsAverage}</p>
              <p><i className="fa-solid fa-star" style={{ color: '#FFD43B' }} /></p>
            </div>
          </div>
      </Link>
        <i onClick={ ()=> {addToList(ele?._id);toggleIcon(ele?._id)}}   className={`${toggle?'fa-solid':'fa-regular'} fa-heart fa-xl text-red-500`}></i>

        </div>
      <button onClick={() => {addMutate(ele?._id)}} className='btn text-white bg-green-700 p-2 rounded-lg block m-auto mb-3'>Add To Cart</button>
    </div>
  )
}
