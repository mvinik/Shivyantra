// TopSlider.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const TopSlider = () => {
  return (
    <div className="w-full h-10 relative bg-white text-sm">
      <Carousel
    
        autoPlay
        infiniteLoop
        // showArrows
        showThumbs={false}
        interval={3000} // Slide interval in ms
        transitionTime={500} // Transition duration (time between slides)
        className="w-full"
        swipeable
        showIndicators={false} 
      >
        <div className="flex justify-center items-center bg-white text-sm  text-gray p-4  shadow-lg">
          <div className="text-center">
            <h2 className="text-sm ">Limited Time Offer: 30% Off on Rudraksham Ceilings</h2>
          </div>
        </div>
        <div className="flex justify-center items-center  bg-white text-sm text-gray p-4  shadow-lg">
          <div className="text-center">
            <h2 className="text-sm ">Exclusive Rudraksham Ceiling Designs - Limited Stock!</h2>
          </div>
        </div>
        <div className="flex justify-center items-center bg-white text-sm text-gray p-4  shadow-lg">
          <div className="text-center">
            <h2 className="text-sm ">Get Free Shipping on Orders Above $100!</h2>
          </div>
        </div>
        
      </Carousel>
    </div>
  );
};

export default TopSlider;