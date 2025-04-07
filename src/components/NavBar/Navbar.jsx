import React, { useState } from 'react';
import { Menu, PopoverBackdrop, Transition } from '@headlessui/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment } from 'react';
import TopNav from '../TopNav/TopNav';
import { Link } from 'react-router-dom';
import api from '../../Utils/api';
import { useQuery } from 'react-query';
import { ChevronDown, ChevronRight } from "lucide-react";
const baseUrl = api.defaults.baseURL;
const Navbar = () => {

const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const { data: Category } = useQuery('NavCategory', async () => {
    const res = await api.get(`api/categories?populate=*`);
    return res.data.data;
  });
  // console.log(Category,'Category');

  return (
    <>
    
 <nav className="bg-red  bg2 shadow-lg hidden lg:flex justify-evenly items-center h-16">
      
 <div className="flex justify-start">
              <a href="/" className="text-xl font-bold">
                {/* <img
                  className="h-16 sm:h-28"
                  src="https://api.shriworks.com/uploads/logoo_d8327e38ee.png"
                  alt="Shriworks Logo"
                /> */}
                <h1 className="text-white">Shivyantra</h1>
              </a>
            </div>

      
      
      
      
      <div className="px-5 hidden lg:flex sm:px-10">
            <div className="ml-10 flex  items-baseline space-x-4">
              <Link
                to={'/'}
                className="text-white hover:underline border border-red transition-all duration-300  hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                Home
              </Link>
              {/* <Popover className="relative text-yellow outline-none border-none">
              {({ open, close }) => (
              <>
              <PopoverButton className='flex outline-none font-bold gap-1 items-center'  >Categories 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              </PopoverButton>

               
              <PopoverPanel anchor="bottom"  className="flex relative  flex-col mt-2 z-50   text-yellow font-semibold  shadow-md shadow-red  bg-white bg-cover rounded-md  ">
               
                <div className='grid grid-cols-3 m-4'>
                  
                {Array.isArray(Category) ? (
                  Category?.map((category, index) => (
                    <Link
                      key={index}
                      className='relative hover:scale-110 transition-all duration-200 px-4 py-2 text-black'
                      onClick={close}
                      to={`/shop?category=${encodeURIComponent(category?.attributes?.CategoryName)}`}
                    >
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <img
                          className='h-20 w-20 rounded-lg shadow-lg shadow-black object-cover'
                          src={`${baseUrl}${category?.attributes?.Image?.data?.attributes?.url}`}
                          alt={category?.attributes?.CategoryName}
                        /> 
                        <span className='font-bold w-24 text-center'>{category?.attributes?.CategoryName}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No categories available</p>
                )}
              </div>
              </PopoverPanel>
              </>
              )}
            </Popover> */}

              <Link
                to={'/shop'}
                className="text-white shrink-0 hover:underline  transition-all duration-300  hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                Shop
              </Link>
              <Link
                to={'/about'}
                className="text-white shrink-0 hover:underline transition-all duration-300   hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                About
              </Link>
              <Link
                to={'/blog'}
                className="text-white shrink-0 hover:underline transition-all duration-300 hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                Blog
              </Link>
              <Link
                to={'/contact'}
                className="text-white shrink-0 hover:underline transition-all duration-300  hover:text-sm px-3 py-2 rounded-md text-md font-bold"
              >
                Contact
              </Link>
              
            </div>
          </div>


    </nav>
        {/* <nav className="bg-white  shadow-lg hidden lg:flex justify-center items-center h-20 ">
      <div className=" md:hidden lg:flex m-2  flex flex-wrap text-[40px] sm:text-[14px]  font-[600]">
          
              {
              (Category?.map((category,index)=>(
                <Link
                key={index}
                className='relative transition-all duration-200 px-2 text-black'

                to={`/shop?category=${encodeURIComponent(category?.attributes?.CategoryName)}`}
              >
                <div className='flex flex-col justify-center items-center  '>
                  {/* <span className="block px-4 py-2  w-full text-sm text-black
                                   hover:bg-red translate-x-1 transition-all duration-300 hover:text-white"

                >{category?.attributes?.CategoryName}</span> 
                  <button
                    onClick={() => toggleCategory(category?.attributes?.CategoryName)}
                    className="flex items-center justify-between w-full text-left p-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    {category?.attributes?.CategoryName}
                    {openCategory === category?.attributes?.CategoryName ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {openCategory === category?.attributes?.CategoryName && (
                    <ul className="">
                      {category?.attributes?.subcategories?.data?.map((subcategory, subIndex) => (
                        <li className="py-1 hover:text-red text-black cursor-pointer">
                          <Link
                            key={subIndex}
                            to={`/shop?subcategory=${encodeURIComponent(subcategory?.attributes?.text)}`}>
                            {subcategory?.attributes?.text}
                          </Link>
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </Link>
              )))
            }
            </div>
               <Popover className="relative text-yellow outline-none border-none">
          {({ open, close }) => (
            <>
            <PopoverButton  className="flex outline-none font-bold gap-1 items-center">
              Category
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </PopoverButton>

            <PopoverPanel
              anchor="bottom"
              className="flex flex-col mt-2 z-50 h-96 w-fit  text-yellow font-semibold  border-red border-solid border-2 border-t-0 border-b-4 bg-yellow   rounded-xl"
            >
             {Array.isArray(Category) ? (
                  Category?.map((category, index) => (
                    <Link
                      key={index}
                      className='relative hover:scale-110 transition-all duration-200 px-4 py-2 text-black'
                      onClick={close}
                      to={`/shop?category=${encodeURIComponent(category?.attributes?.CategoryName)}`}
                    >
                      <div className='flex flex-col justify-center items-center gap-2'>
                        <span className='font-bold'>{category?.attributes?.CategoryName}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No categories available</p>
                )}
            </PopoverPanel>
            </>
              )}
          </Popover>
           
            </nav> */}
    </>
  );
};

export default Navbar;
