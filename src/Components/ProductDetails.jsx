import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { getProductsDetails } from '../APIS/getProductDetails';
import { getRelatedProduct } from '../APIS/allProducts';
import Item from './Item';
import Loading from './Loading';
import Notfound from './Notfound';
import useMutationCart from './Hooks/useMutationCart';
import { addToCartApi } from '../APIS/allCartApis';
import { toast } from 'react-toastify';
import useMutationWishList from './Hooks/useMutaionWishList';
import { addToWishListApi } from '../APIS/AllWishListApis';


export default function ProductDetails() {
  let { mutate: addMutate, status, data } = useMutationCart(addToCartApi)
  let { mutate: addToList, status: listStatus, data: listData } = useMutationWishList(addToWishListApi)

  useEffect(() => {
    if (status === 'success') {
      toast.success(data?.data?.message);
    }
  }, [status, data]);

  let { id, categoryId } = useParams()

  let [product, setProduct] = useState([])
  let [relatedArr, setRelatedArr] = useState([])
  let [msg, setMsg] = useState('')
  let [loading, setLoading] = useState(false)
  let [imgSrc, setImgSrc] = useState()

  // function that display product details
  async function allProductDetails() {
    setLoading(true)
    let data = await getProductsDetails(id)
    if (data?.data) {
      setProduct(data?.data)
      setLoading(false)
      setMsg('')
    } else {
      setMsg(data)
      setLoading(false)
    }
  }
  // function that display related product
  async function allRelatedProduct() {
    setLoading(true)
    let data = await getRelatedProduct(categoryId)
    if (data?.data) {
      setRelatedArr(data?.data)
      setLoading(false)
      setMsg('')
    } else {
      setMsg(data)
      setLoading(false)
    }
  }
  // function that change source of img and display it
  function getImgSrc(e) {
    setImgSrc(e.target.src)
  }

  useEffect(() => {
    allRelatedProduct()
  }, [])

  useEffect(() => {
    allProductDetails()
  }, [id])

  if (loading)
    return <Loading></Loading>

  if (msg)
    return <Notfound></Notfound>

  return (
    <>
      <div className='container flex flex-wrap items-center md:gap-4 sm:gap-10 py-6'>
        <div className='md:w-1/4 sm:w-full'>
          <img src={imgSrc ? imgSrc : product.imageCover} alt="" />
          <ul className='flex justify-center cursor-pointer gap-3 md:pt-5 my-4'>{product?.images?.map(img => <li onClick={getImgSrc} key={img}><motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} src={img} width={90} alt="" /></li>)}</ul>
        </div>
        <div className='md:w-2/3 sm:w-full px-5' >
          <h1 className='text-xl text-green-700'>{product?.title}</h1>
          <p className='text-sm text-gray-400'>{product?.category?.name}</p>
          <p className='text-gray-600 py-3'>{product?.description}</p>
          <div className='flex justify-between'>
            <p className='text-red-500 font-bold'>{product?.price} EGP</p>
            <div className='flex gap-2 py-3'>
              <p>{product?.ratingsAverage}</p>
              <p><i className="fa-solid fa-star" style={{ color: '#FFD43B' }} /></p>
            </div>
          </div>
          <button className='w-full bg-green-600 text-white rounded' onClick={() => { addMutate(product?._id) }}>Add To Cart</button>
        </div>
      </div>
      <hr />
      <h1 className='py-5 text-green-700 font-bold text-4xl text-center'>Related Products</h1>
      <div className='flex flex-wrap container'>
        {relatedArr.map(prod => <Item key={prod._id} ele={prod}></Item>)}
      </div>
    </>
  )
}
