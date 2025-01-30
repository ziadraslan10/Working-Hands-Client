/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/9k=.jpeg";
import slider2 from "../../assets/9k=.jpeg";
import slider3 from "../../assets/9k=.jpeg";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="w-full ">
        <Slider  {...settings}>
          <img src={slider1} className="  rounded-2xl h-[200px] object-cover" alt="" />
          <img src={slider2} className="  rounded-2xl h-[200px] object-cover" alt="" />
          <img src={slider3} className="  rounded-2xl h-[200px] object-cover" alt="" />
        </Slider>
      </div>
    </>
  );
}
