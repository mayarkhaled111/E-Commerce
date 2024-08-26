import React, { useState } from 'react'
import useQueryWishList from './Hooks/useQueryWishList'
import { delListApi, getWishListApi } from '../APIS/AllWishListApis'
import useMutationWishList from './Hooks/useMutaionWishList';
import Loading from './Loading';
import Notfound from './Notfound';

export default function WishList() {
  let { data, isLoading, isError } = useQueryWishList('proInList', getWishListApi)
  let { mutate: delItem, isPending: delProduct } = useMutationWishList(delListApi)

  if (delProduct)
    return <Loading></Loading>

  if (isLoading)
    return <Loading></Loading>
  if (isError)
    return <Notfound></Notfound>

// if i delete product from wish list >>>>>> delete it's id from localStorage
  function removeFromLocalStorage(id) {
    localStorage.removeItem(`${id}`)
    delItem(id)
  }

  return (
    <div className="container PY-7">
      {(data?.count > 0) ?
        <div className='md:flex flex-wrap my-5'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5 container md:w-3/4">
            <table className="container w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete <i className="fa-solid fa-trash fa-lg"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((ele, index) => <tr key={ele?._id} className="border-b">
                  <td className="p-4">
                    <img src={ele?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {ele?.title}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {ele?.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => { removeFromLocalStorage(ele?._id) }} className="font-medium text-white p-2 bg-green-700 rounded-xl">Remove</button>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        : <div className='container my-5'>
          <h1 className='text-center text-green-700 text-4xl my-5'>No product added</h1>
        </div>}
    </div>
  )
}
