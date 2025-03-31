import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; 
import api from '../../Utils/api';
import './CategorySlider.css';

const CategorySlider = ({ CategoryData }) => {
  const category = CategoryData?.attributes?.Category;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState('All Categories');
  const baseUrl = api.defaults.baseURL;
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = () => setIsDragging(false);

  const handleMouseMove = () => setIsDragging(true);

  const handleMouseUp = (category) => {
    if (!isDragging && category !== 'All Categories') {
      handleMenuItemClick(category);
    }
  };

  const handleMenuItemClick = (category) => {
    setSelectedCategory(category);
    if (category !== 'All Categories') {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className='Next'
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFEEA9" // Icon color
          width="24px"
          height="24px"
        >
          <path d="M10 6l6 6-6 6V6z" />
        </svg>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
     className='Prev'
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFEEA9" // Icon color
          width="24px"
          height="24px"
        >
          <path d="M14 18l-6-6 6-6v12z" />
        </svg>
      </div>
    );
  };
  const settings = {
    infinite: true,
    autoplay: false,
    // speed: 1000,
    autoplaySpeed: 2500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    // arrows: false,
    easing: 'easeOut',
    rows: 1,
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="py-5 justify-center items-center w-50 h-96">
           <h2 className="flex flex-row flex-nowrap items-center">
        <span className="flex-grow block border-t border-red"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 lg:text-xl rounded leading-none uppercase font-bold bg-red text-yellow">
          Categories
        </span>
        <span className="flex-grow block border-t border-red"></span>
      </h2>

      <Slider className="cateSlider flex  justify-center items-center" {...settings}>
        {category?.map((cate, index) => (
          <div
            key={index}
            className="py-20 flex flex-col w-full  justify-center items-center text-center cursor-pointer  bg-transparent rounded"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => handleMouseUp(cate?.category?.data?.attributes?.CategoryName)}
          >
            <div className='object-fit w-full h-full px-1 flex items-center justify-center  '>
            <img
            // style={{width:'150px',height:'150px'}}
              className="h-32 w-32 rounded-full"
              src={`${baseUrl}${cate?.category?.data?.attributes?.Image?.data?.attributes.url}`}
              alt={cate?.category?.data?.attributes?.CategoryName}
            />
            </div>
            <h1 className="font-bold mt-2 text-center py-5 text-black text-md rounded  text-[16px] sm:text-sm">
              {cate?.category?.data?.attributes?.CategoryName}
            </h1>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
