/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import Slider from "react-slick";
import slider1 from "../../assets/9k=.jpeg";

export default function MainSlider() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true, // Keep infinite looping
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay
    prevArrow: (
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
        <span className="text-2xl">&lt;</span>
      </button>
    ),
    nextArrow: (
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out">
        <span className="text-2xl">&gt;</span>
      </button>
    ),
  };

  return (
    <>
      <div className="w-full relative">
        <Slider {...settings} ref={sliderRef}>
          <img src={slider1} className="rounded-2xl lg:h-[300px] h-[200px] object-cover" alt="" />
          <img src={slider1} className="rounded-2xl lg:h-[300px] h-[200px] object-cover" alt="" />
          <img src={slider1} className="rounded-2xl lg:h-[300px] h-[200px] object-cover" alt="" />
        </Slider>
      </div>
    </>
  );
}
