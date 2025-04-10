import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="w-full mx-auto p-4 rounded-3xl shadow-md ">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <h3 className="md:mb-6 md:text-5xl bg-gradient-to-r from-purple-600 via-teal-500 to-pink-600 text-transparent bg-clip-text font-semibold">
              {item.title}
            </h3>
            <img src={item.src} className="rounded-xl" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
