import React, { useContext, useState } from 'react'
import { motion } from "framer-motion"
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { NavLink, useNavigate,Link } from 'react-router-dom'
import { auth } from '../Context/AuthContext';
import useQueryCart from './Hooks/useQueryCart';
import { getCartApi } from '../APIS/allCartApis';
import { getWishListApi } from '../APIS/AllWishListApis';
import useQueryWishList from './Hooks/useQueryWishList';

export default function Navbar() {
  let {data:cart} = useQueryCart('proInCart',getCartApi)
  let {data:list} = useQueryWishList('proInList',getWishListApi)
  let navigate = useNavigate()
  let [open, setOpen] = useState(false)
  let { isLogin, setLogin } = useContext(auth)


  function toggle() {
    setOpen(!open)
  }
  function logOut() {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/login')
  }
  return (
    <nav className='py-3 bg-main-light sticky top-0 left-0 right-0 z-50'>
      <div className="container md:flex gap-3 items-center justify-between relative">
        <div className="logo md:flex gap-3 items-center">
          <img src={logo} alt="logo" />
          {isLogin?<ul className={`md:flex gap-3 ${open ? 'block' : 'hidden'} md:my-0 my-2`} >
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/products'}>Product</NavLink></li>
            <li><NavLink to={'/brand'}>Brand</NavLink></li>
          </ul> : ''}
        </div>
        <div>
          <ul className={`md:flex gap-4 ${open ? 'block' : 'hidden'} md:my-0 my-2`}>
            {isLogin?
            <>
            <li className='cursor-pointer' onClick={logOut}>LogOut</li>
            <li className='relative md:my-0 my-3' style={{width:'fit-content'}}><Link to={'/cart'}>
              <i className=" fa-solid fa-cart-shopping fa-xl">
              </i>
              <span className='absolute top-[-15px] right-[-15px] bg-main w-[25px] h-[25px] rounded-full text-white flex justify-center items-center'>{cart?cart?.numOfCartItems:0}</span>
            </Link>
            </li>
            <li className='relative md:my-0 my-3' style={{width:'fit-content'}}><Link to={'/wishList'}>
            <i className="fa-solid fa-heart fa-xl text-red-500" ></i>
            <span className='absolute top-[-15px] right-[-15px] bg-main w-[25px] h-[25px] rounded-full text-white flex justify-center items-center'>{list?.count > 0 ? list?.count : 0 }</span>
            </Link>
            </li>
            <li className='text-green-700 font-bold capitalize'>hi {isLogin.name}</li>
            </>
            :<><li><NavLink to={'/login'}>Login</NavLink></li>
            <li><NavLink to={'/register'}>Register</NavLink></li>
            <li className='flex gap-3 md:my-0 my-2'>
              <a href=""><i className="fa-brands fa-facebook-f" /></a>
              <a href=""><i className="fa-brands fa-twitter" /></a>
              <a href=""><i className="fa-brands fa-google" /></a>
              <a href=""><i className="fa-brands fa-instagram" /></a>
            </li></>}
          </ul>
        </div>
        <i onClick={toggle} className={`md:hidden block bars fas fa-bars fa-2xl absolute top-3 right-6 cursor-pointer`} />
      </div>
    </nav>
    
  )
}
