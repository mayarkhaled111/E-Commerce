import React, { useEffect, useState } from 'react'
import { getCategories } from '../APIS/getCategories'
import Loading from './Loading'
import Notfound from './Notfound'
import Slider from "react-slick";

export default function Categories() {
  let[catArr,setCatArr] = useState([])
  let[msg,setMsg] = useState('')
  let [loading,setLoading] = useState(false)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  async function getCategoriesApi(){
    setLoading(true)
    let data = await getCategories()
    if(data?.data){
      setCatArr(data?.data)
      setLoading(false)
      setMsg('')
  } else{
      setMsg(data)
      setLoading(false)
  }
  }

useEffect(()=>{
  getCategoriesApi()
},[])

if(loading)
  return <Loading></Loading>

if(msg)
  return <Notfound></Notfound>

  return (
    <div className='container slider-container'>
    <Slider {...settings} className='mt-10'>
      {catArr.map(ele=> <img key={ele._id} src={ele.image} className='h-[150px]' style={{objectFit:'cover'}}></img>)}
    </Slider>
    </div>
);
  
}
