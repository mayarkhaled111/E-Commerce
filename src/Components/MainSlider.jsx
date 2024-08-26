import React from 'react'
import mainImage from '../assets/finalProject assets/images/slider-image-1.jpeg'
import img1 from '../assets/finalProject assets/images/slider-image-2.jpeg'
import img2 from '../assets/finalProject assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
      };
  return (
    <div className='container flex flex-wrap my-5'>
        <div className='w-2/3'>
            <Slider {...settings}>
                <img src={mainImage} className='w-full md:h-[400px] h-[100px]' alt="" />
                <img src={img1} className='w-full md:h-[400px] h-[100px]' alt="" />
                <img src={img2} className='w-full md:h-[400px] h-[100px]' alt="" />
            </Slider>
        </div>
        <div className='w-1/3'>
            <img src={img1} className='w-full md:h-[200px] h-[50px]' alt="" />
            <img src={img2} className='w-full md:h-[200px] h-[50px]' alt="" />
        </div>
    </div>
  )
}
