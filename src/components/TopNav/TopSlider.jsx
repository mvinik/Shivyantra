// TopSlider.js
import { Key } from 'lucide-react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const TopSlider = () => {
  const toplines=[{lines:['Limited Time Offer: 30% Off on Rudraksham Ceilings',
    'Exclusive Rudraksham Ceiling Designs - Limited Stock!','Get Free Shipping on Orders Above $100!'
  ]}]
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
        {toplines[0].lines?.map((line,index)=>(
          <React.Fragment key={index}>
              <div className="flex justify-center items-center bg-white text-sm  text-gray p-4  shadow-lg">
          <div className="text-center">
            <h2 className="text-sm ">{line}</h2>
          </div>
        </div>
        
        
          </React.Fragment>
        ))}
      
      </Carousel>
    </div>
  );
};

export default TopSlider;