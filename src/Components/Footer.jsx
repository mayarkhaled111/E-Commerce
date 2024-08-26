import React from 'react'
import LOGO from '../assets/finalProject assets/freshcart-logo.svg'

export default function () {
    return (
        <div className='bg-main-light h-60 flex flex-col justify-center'>
            <div className="container">
                <h1 className='text-2xl'>Get the FreshCart app</h1>
                <p className='text-gray-400 text-sm'>We will send you a link, open it on your phone to download the app</p>
                <div className="flex gap-3 items-center mt-4">
                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-2/3 p-1 " placeholder="Email..."/>
                <button className='text-white bg-green-700 px-3 h-7 rounded-md'>share app link </button>
            
                </div>
            </div>
        </div>
    )
}
