import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../tailwind.config.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify';


const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false}}})
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
      <ToastContainer autoClose={3000}></ToastContainer>
      <App />
    </AuthContextProvider>
  </QueryClientProvider>

)
