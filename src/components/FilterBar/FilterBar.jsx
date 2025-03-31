import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import PriceRange from "../../Utils/PriceRange/PriceRange";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../Utils/api";
import { ChevronDown, ChevronRight } from "lucide-react";
 
const FilterBar = ({ selectedFilters, setSelectedFilters, selectedSort, setSortCategory }) => {
  const navigate = useNavigate();
 
  const handleMenuItemClick = (category) => {
    setSortCategory(category);
  };

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const handleFilterSelection = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };


  const { data: Category } = useQuery('NavCategory', async () => {
    const res = await api.get(`api/categories?populate=*`);
    return res.data.data;
  });

  return (
    <>
      <section className="bg-white ">
       
        <div className="mb-5">

          <p className="text-red text-left font-semibold text-xl">Filter By Price </p>
          <PriceRange

            onChange={(range) => {
              handleFilterSelection("price", range);
            }}
          />

        </div>
        <div className="">
          <h2 className="text-red text-xl font-semibold ">Categories</h2>
          <ul>

            {Array.isArray(Category) ? (
              Category?.map((category, index) => (
                <Link
                  key={index}
                  className='relative transition-all duration-200 px-4 py-2 text-black'

                  to={`/shop?category=${encodeURIComponent(category?.attributes?.CategoryName)}`}
                >
                  <div className='flex flex-col justify-center items-center gap-2 '>
                    {/* <span className="block px-4 py-2  w-full text-sm text-black
                                     hover:bg-red translate-x-1 transition-all duration-300 hover:text-white"

                  >{category?.attributes?.CategoryName}</span> */}
                    <button
                      onClick={() => toggleCategory(category?.attributes?.CategoryName)}
                      className="flex items-center justify-between w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                    >
                      {category?.attributes?.CategoryName}
                      {openCategory === category?.attributes?.CategoryName ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    {openCategory === category?.attributes?.CategoryName && (
                      <ul className="ml-4 mt-2">
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
              ))
            ) : (
              <p>No categories available</p>
            )}
          </ul>
        </div>
 



        {/* <div className="flex justify-center items-center gap-2 sm:gap-6  text-red">
          <h3 className="text-red flex-wrap text-lg font-bold">Sort By :   </h3>
            <div className="">
              <Menu as="div" className="relative  inline-block ">
                <div>
                  <MenuButton className="flex border  border-rd items-center w-full justify-center rounded-sm shadow-sm bg-white p-1 font-semibold text-red  ">
                    {selectedSort}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-red"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className=" shadow-red shadow-md absolute  right-0 z-50 mt-2 w-56 overflow-hidden origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1 z-50  ">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm text-black  ${active
                              ? "bg-red translate-x-1 transition-all duration-300 text-white"
                              : ""
                            }`}
                          onClick={() => handleMenuItemClick("Default")}
                        >
                          Default
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm text-black ${active
                              ? "bg-red translate-x-1 transition-all duration-300 text-white"
                              : ""
                            }`}
                          onClick={() => handleMenuItemClick("Price: Low to High")
                          }
                        >
                          Price: Low to High
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm text-black ${active
                              ? "bg-red translate-x-1 transition-all duration-300 text-white"
                              : ""
                            }`}
                          onClick={() =>
                            handleMenuItemClick("Price: High to Low")
                          }
                        >
                          Price: High to Low
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm text-black ${active
                              ? "bg-red translate-x-1 transition-all duration-300 text-white"
                              : ""
                            }`}
                          onClick={() =>
                            handleMenuItemClick("Alphabetically, A-Z")
                          }
                        >
                          Alphabetically, A-Z
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm text-black ${active
                              ? "bg-red translate-x-1 transition-all duration-300 text-white"
                              : ""
                            }`}
                          onClick={() =>
                            handleMenuItemClick("Alphabetically, Z-A")
                          }
                        >
                          Alphabetically, Z-A
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm text-black ${active
                              ? "bg-red translate-x-1 transition-all duration-300 text-white"
                              : ""
                            }`}
                          onClick={() => handleMenuItemClick("Latest")}
                        >
                          Latest
                        </a>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div> 
       */}
      </section>



    </>
  );
};

export default FilterBar;
