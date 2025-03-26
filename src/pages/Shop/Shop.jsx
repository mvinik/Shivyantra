import React, { useEffect, useState, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Card from '../../components/Card/Card';
import FilterBar from '../../components/FilterBar/FilterBar';
import Loading from '../../components/Loading/Loading';
import api from '../../Utils/api';
import TechError from '../Error/TechError';
import { useQuery } from 'react-query';
import Link from 'antd/es/typography/Link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import PriceRange from '../../Utils/PriceRange/PriceRange';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu,MenuButton,MenuItem,MenuItems } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
const Shop = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryFromQuery = queryParams.get('category');
  const searchFromQuery = queryParams.get('search');

  const [openCategory, setOpenCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };
  const handleMenuItemClick = (category) => {
    
    setSortCategory(category);
  };

  const [selectedFilters, setSelectedFilters] = useState({
    material: '',
    price: '',
    category: '',
    subcategory:'',
  });
  const [selectedSort, setSortCategory] = useState('Default');
  const itemsPerPage = 24;
  const observerRef = useRef(null);
  const { data: Category } = useQuery('NavCategory', async () => {
    const res = await api.get(`api/categories?populate=*`);
    return res.data.data;
  });

  const fetchProducts = async ({ pageParam = 1 }) => {
    const filters = {
      ...(selectedFilters.material && { 'filters[Material]': selectedFilters.material }),
      ...(selectedFilters.category && { 'filters[category][CategoryName]': selectedFilters.category }),
      ...(selectedFilters.subcategory && { 'filters[category][subcategories][text]': selectedFilters.subcategory }),
      ...(selectedFilters.price && {
        'filters[Price][$gte]': selectedFilters.price[0],
        'filters[Price][$lte]': selectedFilters.price[1],
      }),
      ...(searchFromQuery && { 'filters[ProductName][$containsi]': searchFromQuery }),
    };

    const sorting = {
      'Price: Low to High': 'Price:asc',
      'Price: High to Low': 'Price:desc',
      'Alphabetically, A-Z': 'ProductName:asc',
      'Alphabetically, Z-A': 'ProductName:desc',
      'Latest': 'createdAt:desc',
    };

    const query = new URLSearchParams({
      ...filters,
      ...(selectedSort !== 'Default' && { sort: sorting[selectedSort] }),
      populate: '*',
      'pagination[page]': pageParam,
      'pagination[pageSize]': itemsPerPage,
    });

    const res = await api.get(`/api/Products?${query.toString()}`);
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(['Products', selectedFilters, selectedSort], fetchProducts, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage?.meta?.pagination?.page + 1;
      return nextPage <= lastPage?.meta?.pagination?.pageCount ? nextPage : undefined;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        category: categoryFromQuery,
      }));
    }
    if (searchFromQuery) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        search: searchFromQuery,
      }));
    }
  }, [categoryFromQuery, searchFromQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;
  if (isError) return <TechError />;

  const clearFilters = () => {
    setSortCategory("Default");
    setSelectedFilters({
      material: "",
      price: "",
      category: "",
      subcategory:"",
      search: ""
    });
    navigate('/shop');
  };

  return (
    <>
 <div className="flex flex-row lg:hidden sm:m-5 items-end justify-end sm:justify-between w-full">
  {/* Menu button for mobile */}
  <div  className="text-red lg:hidden ml-5 text-center justify-center">
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
   
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>
  </div>

  {/* Sort By Section */}
  <div className="flex items-center gap-2 sm:gap-4 text-red ml-auto mr-10">
    <h3 className="text-lg font-semibold">Sort By :</h3>
    <Menu as="div" className="relative inline-block">
      <div>
        <MenuButton className="flex border border-rd items-center w-full justify-center rounded-sm shadow-sm bg-white p-1 font-semibold text-red">
          {selectedSort}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-red"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="shadow-red shadow-md absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 transition"
      >
        <div className="py-1 z-50">
          {[
            "Default",
            "Price: Low to High",
            "Price: High to Low",
            "Alphabetically, A-Z",
            "Alphabetically, Z-A",
            "Latest",
          ].map((option) => (
            <MenuItem key={option}>
              {({ active }) => (
                <a
                  href="#"
                  className={`block px-4 py-2 text-sm text-black ${
                    active ? "bg-red translate-x-1 transition-all duration-300 text-white" : ""
                  }`}
                  onClick={() => handleMenuItemClick(option)}
                >
                  {option}
                </a>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  </div>
</div>
 
      
      <section className='flex sm:flex-col lg:flex-row'>
        
        <div  >
          <aside   className={`fixed inset-y-0 left-0 w-64  bg-white p-4 shadow-lg transform z-50 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 
        lg:relative lg:translate-x-0 lg:w-auto lg:shadow-none`}
    >
            <FilterBar
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              selectedSort={selectedSort}
              setSortCategory={setSortCategory}

            />

          </aside>
          {isMenuOpen && (
          <div
            className="fixed inset-0 bg-red opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        </div>
        
        <div>
        
<div>
<div className='flex m-5 flex-row items-center justify-between'>
      
      {selectedFilters.category || selectedFilters.material || selectedFilters.price || selectedFilters.search ? (
        <div className=" mx-4 flex  flex-row sm:justify-start sm:gap-5 sm:items-center">
          {/* <p className="text-lg text-red font-bold ">Selected Filters:</p> */}
          <button
            className="bg-red shadow-lg hover:scale-105 transition-all duration-200 shadow-red text-yellow px-3 py-1 rounded-md"
            onClick={clearFilters}
          >
            x
          </button>
          <div className="flex gap-2">
            {Object.entries(selectedFilters).map(([key, value]) => (
              key === 'price' && value ? (
                // Format price range
                <span key={key} className="bg-yellow flex text-sm sm:text-lg shadow-lg shadow-red text-red px-2 py-1 rounded-md">
                  {`Price: ${value[0]} - ${value[1]}`}
                </span>
              ) : (
                value && (
                  <span key={key} className="bg-yellow flex text-sm sm:text-lg shadow-lg shadow-red text-red px-2 py-1 rounded-md">
                    {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                  </span>
                )
              )
            ))}

          </div>
        </div>
      ) : null}

       {/* Sort By Section */}
 <div className='flex flex-row  items-center gap-2 sm:gap-4 text-red ml-auto mr-10'>
 <div className=" hidden lg:block">
    <h3 className="text-lg font-semibold">Sort By :</h3>
    <Menu as="div" className="relative inline-block">
      <div>
        <MenuButton className="flex border border-rd items-center w-full justify-center rounded-sm shadow-sm bg-white p-1 font-semibold text-red">
          {selectedSort}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-red"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="shadow-red shadow-md absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 transition"
      >
        <div className="py-1 z-50">
          {[
            "Default",
            "Price: Low to High",
            "Price: High to Low",
            "Alphabetically, A-Z",
            "Alphabetically, Z-A",
            "Latest",
          ].map((option) => (
            <MenuItem key={option}>
              {({ active }) => (
                <a
                  href="#"
                  className={`block px-4 py-2 text-sm text-black ${
                    active ? "bg-red translate-x-1 transition-all duration-300 text-white" : ""
                  }`}
                  onClick={() => handleMenuItemClick(option)}
                >
                  {option}
                </a>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  </div>
 </div>

   </div>
   
</div>

          <div>
         
            {data?.pages?.[0]?.data?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-2 sm:gap-3 p-3 lg:px-10">
                  {data.pages.flatMap((page) =>
                    page.data.map((product) => (
                      <div className="sm:p-2" key={product.id}>
                        <Card product={product} />
                      </div>
                    ))
                  )}
                </div>
                <div ref={observerRef} className="h-10" />
              </>
            ) : (
              <div className="text-center w-full p-16">
                <h2 className="text-gray font-bold text-2xl">No products found matching your filters</h2>
              </div>
            )}
          </div>
        </div>
      </section></>
  );
};

export default Shop;
