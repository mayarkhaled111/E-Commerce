import { useState } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import ForgetPassword from './Components/ForgetPassword'
import ResetPassword from './Components/ResetPassword'
import Products from './Components/Products'
import ProductBrand from './Components/ProductBrand'
import ProductDetails from './Components/ProductDetails'
import Cart from './Components/Cart'
import Brand from './Components/Brand'
import Notfound from './Components/Notfound'
import ProtectedRoute from './Components/ProtectedRoute'
import UpdatePassword from './Components/UpdatePassword'
import WishList from './Components/WishList'
import AllOrders from './Components/AllOrders'

function App() {
  let routes = createHashRouter([{
    path:'/',element:<Layout></Layout>,children:[
      {index:true,element: <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'/login',element: <Login></Login>},
      {path:'/register',element: <Register></Register>},
      {path:'/forgetPassword',element: <ForgetPassword></ForgetPassword>},
      {path:'/resetPassword',element: <ResetPassword></ResetPassword>},
      {path:'/updatePassword',element: <UpdatePassword></UpdatePassword>},
      {path:'/allorders',element: <AllOrders></AllOrders>},
      {path:'/products',element: <ProtectedRoute><Products></Products></ProtectedRoute>},
      {path:'/productbrand/:id',element: <ProtectedRoute><ProductBrand></ProductBrand></ProtectedRoute>},
      {path:'/productDetails/:id/:categoryId',element: <ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path:'/cart',element: <ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'/wishList',element: <ProtectedRoute><WishList></WishList></ProtectedRoute>},
      {path:'/brand',element: <ProtectedRoute><Brand></Brand></ProtectedRoute>},
      {path:'*',element: <Notfound></Notfound>},
    ]
  }])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
