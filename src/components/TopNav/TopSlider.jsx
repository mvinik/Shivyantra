// TopSlider.js
import { Key } from 'lucide-react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Link from 'antd/es/typography/Link';
const TopSlider = () => {
  const toplines=[{lines:['Limited Time Offer: 30% Off on Rudraksham Ceilings',
    'Exclusive Rudraksham Ceiling Designs - Limited Stock!','Get Free Shipping on Orders Above $100!'
  ]}]
  return (
    <div className="w-full  relative h-10 bg-white  text-sm">
   {/* <nav className="bg-red  text-md ">
      <div className="flex flex-row justify-between mx-5 py-2">
            <div className="flex flex-row justify-between items-center">
              <Link
                to={'/about'}
                className="text-white shrink-0 hover:bg-white hover:-translate-y-1 transition-all duration-300 hover:text-red  hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                About
              </Link>
              <Link
                to={'/blog'}
                className="text-white shrink-0  hover:bg-white hover:-translate-y-1 transition-all duration-300 hover:text-red hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                Blog
              </Link>
            
              
            </div>
            <div className=''> 
               <Link
                to={'/contact'}
                className="text-white shrink-0 hover:bg-white hover:-translate-y-1 transition-all duration-300 hover:text-red hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                Contact
              </Link></div>
          </div>


    </nav> */}
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
              <div className="flex justify-center items-center text-sm  text-black p-4 ">
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