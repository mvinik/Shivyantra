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
import Prac from "../Prac";
 
const FilterBar = ({ selectedFilters, setSelectedFilters, selectedSort, setSortCategory }) => {
  const navigate = useNavigate();
 const [prac,setprac]=useState(false)
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
                  className='relative transition-all duration-200 px-4 py-1 text-black'

                  to={`/shop?category=${encodeURIComponent(category?.attributes?.CategoryName)}`}
                >
                  <div className='flex flex-col justify-center items-center gap-2 '>
                    {/* <span className="block px-4 py-2  w-full text-sm text-black
                                     hover:bg-red translate-x-1 transition-all duration-300 hover:text-white"

                  >{category?.attributes?.CategoryName}</span> */}
                    <button
                      onClick={() => toggleCategory(category?.attributes?.CategoryName)}
                      className="flex  items-center justify-between w-full text-left bg-gray-200 hover:bg-gray-300 rounded-md"
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
                          <li className="py-1 items-start justify-start hover:text-red text-black cursor-pointer">
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
      </section>



    </>
  );
};

export default FilterBar;
