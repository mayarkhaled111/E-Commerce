import React from 'react'
import useQueryCart from './Hooks/useQueryCart'
import useMutationCart from './Hooks/useMutationCart'
import { clearCartApi, delCartApi, getCartApi, updateCartApi } from '../APIS/allCartApis'
import Loading from './Loading'
import Notfound from './Notfound'
import cart from '../assets/finalProject assets/images/empty-cart.jpg'

import BasicModal from './BasicModal'


export default function Cart() {
 let { data, isLoading, isError } = useQueryCart('proInCart', getCartApi)
  let { mutate: delItem,isPending:delPending } = useMutationCart(delCartApi)
  let { mutate: update,isPending:updatePending} = useMutationCart(updateCartApi)
  let { mutate: clear ,isPending:clearPending} = useMutationCart(clearCartApi)

  if(isLoading || delPending || updatePending || clearPending)
    return <Loading></Loading>

  if (isLoading)
    return <Loading></Loading>

  if (isError)
    return <><h1 className='text-center text-green-700 text-4xl my-5'>Cart Is Empty</h1>
      <img className='m-auto w-1/2' src={cart} alt="cart" /></>

  return (
    <>
      <div className="container">
        {(data?.numOfCartItems) ?
          <div className='md:flex flex-wrap my-5'>
            {data?<button className='bg-green-700 text-white p-1 rounded-xl my-10 ms-auto w-full' onClick={() => { clear() }}>Clear Cart</button>:''}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5 container md:w-3/4 my-3">
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
                      Quantity
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
                  {data?.data?.products.map((ele, index) => <tr key={ele?.product?._id} className="border-b">
                    <td className="p-4">
                      <img src={ele?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {ele?.product?.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button onClick={() => { (ele?.count == 1) ? delItem(ele?.product?._id) : update({ id: ele?.product?._id, count: ele?.count - 1 }) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <span>{ele?.count}</span>
                        <button onClick={() => { (data?.data?.products[index]?.product?.quantity) ? update({ id: ele?.product?._id, count: ele?.count + 1 }) : '' }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {ele?.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => delItem(ele?.product?._id)} className="font-medium text-white p-2 bg-green-700 rounded-xl">Remove</button>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className='md:w-1/4 shadow-md p-5 rounded-md'>
              <h1 className='text-green-700 text-2xl text-center'>ALL DETAILS</h1>
              <hr className='border-b-gray-200 border-b-2 mt-2' />
              <div className='flex gap-3 text-xl my-10'><h1 className=' text-green-700'>Total Price:</h1><h1>{data?.data?.totalCartPrice} EGP</h1></div>
              <div className='flex gap-3 text-xl my-10'><h1 className=' text-green-700'>Items:</h1><h1>{data?.numOfCartItems} pieces</h1></div>
              <BasicModal cardId={data?.data?._id}></BasicModal>
            </div>
          </div>
          : <div className='container my-5'>
            <h1 className='text-center text-green-700 text-4xl my-5'>Cart Is Empty</h1>
            <img className='m-auto w-1/2' src={cart} alt="cart" />
          </div>}
      </div>

    </>
  )
}
