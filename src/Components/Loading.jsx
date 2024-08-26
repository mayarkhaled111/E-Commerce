import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-gray-300 bg-opacity-5'>
      <span className="loader"></span>
    </div>
  )
}
