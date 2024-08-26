import { useQueries } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useQueryCart from './Hooks/useQueryCart'
// import { getAllOrders } from '../APIS/payment'
import { getCartApi } from '../APIS/allCartApis'
import { getAllOrders } from '../APIS/payment'

export default function AllOrders() {
  let { data: orderData, status } = useQueryCart('cardId', getAllOrders)
  let [orders, setOrders] = useState([])


  useEffect(() => {
    if (status == 'success')
      setOrders(orderData)
  })

  return (
    <>
    <div className='flex flex-wrap text-center container'>
      {orders.map((ele) => <div key={ele?._id} className='dashboard md:w-1/3'>
        <div className="card ">
          <h3 className='text-green-700 pb-3 text-xl'>Order Details</h3>
          <p className='text-gray-400 py-2'><span>Created At:</span> {new Date(ele?.createdAt).toLocaleDateString()}</p>
          <p className='text-gray-400 py-2'><span>Total Orders:</span> {ele?.cartItems?.length}</p>
          <p className='text-gray-400 py-2'><span>Delivered:</span> {ele?.isDelivered?'Yes':'No'}</p>
          <p className='text-gray-400 py-2'><span>Is Paid</span> {ele?.isPaid?'Yes':'No'}</p>
          <p className='text-gray-400 py-2'><span>Payment Method:</span> {ele?.paymentMethodType}</p>
          <p className='text-gray-400 py-2'><span>Total Order Price:</span> {ele?.totalOrderPrice} EGP</p>
        </div>
      </div>)}
    </div>
    </>
  )
}
