import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';

// post all data about the user

export default function Login() {
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let {setLogin} = useContext(auth)
  let [msg, setMsg] = useState('')

  async function handelResetPassword(values) {
    setLoading(true)
    try {
        let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
        if(data.token)
            navigate('/login')
    } catch (error) {
        setMsg(error?.response?.data?.message);
        setLoading(false)
    }
  }

  // check validation 
  let validationSchema = Yup.object({
    email: Yup.string().matches(/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/).required('email is required'),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with capital letter').required('newPassword is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handelResetPassword
  })
  return (
    <div className='py-4 '>
      <form className="max-w-md mx-auto py-6" onSubmit={formik.handleSubmit}>
        <h1 className='py-6 text-2xl'>Set New Password:</h1>
        {msg ? <p className="py-5 text-xl text-center text-red-600 dark:text-red-600">{msg}</p> : ''}
        <div>
          
          <div className="relative z-0 w-full mt-5 group">
            <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-200 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          {(formik.errors.email) && formik.touched.email ? <p id="filled_success_help" className="text-xs text-red-600 dark:text-red-400">{formik.errors.email}</p> : ''}

          <div className="relative z-0 w-full mt-5 group">
            <input onBlur={formik.handleBlur} value={formik.values.newPassword} onChange={formik.handleChange} type="password" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-200 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
          </div>
          {(formik.errors.newPassword) && formik.touched.newPassword ? <p id="filled_success_help" className="text-xs text-red-600 dark:text-red-400">{formik.errors.newPassword}</p> : ''}
          
        </div>
        <button type="submit" className="mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loading ? <i className="fa-solid fa-spinner fa-spin" style={{ color: '#ffffff' }} />
          : 'Submit'}</button>
      </form>
      
    </div>
  )
}

