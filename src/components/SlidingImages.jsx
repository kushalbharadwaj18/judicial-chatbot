import React from "react";
// Import slick slider styles in your component or main App CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./SlidingImages.css";
import Slider from "react-slick";
const SlidingImages = () => {
  const images = [
    "https://cbpssubscriber.mygov.in/assets/uploads/juGajmc1gOVBUtt5?97",
    "https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2024/10/202410101517755538.jpg",
    "https://cdnbbsr.s3waas.gov.in/s35d6646aad9bcc0be55b2c82f69750387/uploads/2024/09/202409171424540459.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div  style={{ width: "95vw", margin: "auto" }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} style={{ width: "100%" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlidingImages;
