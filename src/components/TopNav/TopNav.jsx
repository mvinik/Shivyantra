import React, { useState,useEffect } from "react";
import { Menu, PopoverBackdrop, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../pages/Auth/Login";
import { useQuery, useQueryClient } from "react-query";
import Navbar from "../NavBar/Navbar";
import api from "../../Utils/api";
// 
let isLogin;
const userConfirmed = localStorage.getItem('userConfirmed') === "true";
const LoginConfirmed = localStorage.getItem('LoginConfirmed') === "true";

if (userConfirmed) {
  isLogin = true;
} else if (LoginConfirmed) {
  isLogin = true;
} else {
  isLogin = false;
}

// console.log(loggedIn, "logged in successfully");


const TopNav = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userConfirmed');
    localStorage.removeItem('LoginConfirmed');
    localStorage.removeItem('RegUserId');
    localStorage.removeItem('RegJWT');
    localStorage.removeItem('RegConfirmed');
    localStorage.removeItem('RegUserId');
    localStorage.removeItem('RegName');
    localStorage.removeItem('RegEmail');
    localStorage.removeItem('RegNumber');
    localStorage.removeItem('LoginJWT');
    localStorage.removeItem('LoginUserId');
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserNumber');
    localStorage.removeItem('User');
    navigate('/')
    window.location.reload();
  }
  const user = localStorage.getItem('UserName');
  console.log(user,'user')
   

  const { data: Cate } = useQuery("TopNavCategory", async () => {
    const res = await api.get(
      `api/categories?populate=*`
    );
    return res.data.data;
  });


  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleMenuItemClick = (category) => {
    setSelectedCategory(category);
    if (category !== "All Categories") {
      navigate(`/shop?category=${encodeURIComponent(category)}`);
    } else {
      navigate("/shop");
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
  };


  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // queryClient.invalidateQueries(totalQuantity);

  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Auto-show login modal after 30 seconds
    useEffect(() => {
      const LoginUserId = localStorage.getItem('LoginUserId');
     if(!LoginUserId){
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000); // 30 seconds
      return () => clearTimeout(timer); // Cleanup when component unmounts
     }
  
     
    }, []);
  return (
    <>
      <nav className=" shadow-lg sm:py-5 py-2 items-center">
        <div className="px-5 sm:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Left section for the logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold">
                {/* <img
                  className="h-16 sm:h-28"
                  src="https://api.shriworks.com/uploads/logoo_d8327e38ee.png"
                  alt="Shriworks Logo"
                /> */}
                <h1 className="text-red">Shivyantra</h1>
              </a>
            </div>

            {/* Middle section for the nav menu */}

            <div className="lg:flex hidden items-center justify-center  ">
              <div className="rounded-lg  p-5 ">
                <div className="flex  shadow-lg shadow-gray-300 rounded-lg">
                  {/* <Navbar/> */}
                  <div className="flex w-10 shadow-lg items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-yellow bg-white p-5">
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="pointer-events-none absolute w-5 fill-red transition"
                    >
                      <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-[300px] bg-white shadow-lg text-black pl-2 text-base font-semibold outline-0"
                    placeholder="Search for the product..."
                    id="search-product"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    autoComplete="off"
                  />

                  {/* Dropdown here */}
                  {/* <Menu as="div" className="relative  inline-block shadow-lg">
                    <div>
                      <MenuButton className="inline-flex border-l  border-yellow items-center w-full justify-center  shadow-sm bg-white p-3 text-sm font-semibold text-black ">
                        {selectedCategory}
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 h-5 w-5 text-black"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 h-96 overflow-y-scroll z-50 mt-2 w-56 overflow-hidden origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          {({ active }) => (
                            <a
                              className={`block px-4 py-2 cursor-pointer text-sm text-black ${
                                active
                                  ? "bg-white translate-x-1 transition-all duration-300 text-red"
                                  : ""
                              }`}
                              onClick={() =>
                                handleMenuItemClick("All Categories")
                              }
                            >
                              All Categories
                            </a>
                          )}
                        </MenuItem>
                        {Array.isArray(Cate) ? (
                          Cate.map((category, index) => (
                            <MenuItem key={index}>
                              {({ active }) => (
                                <a
                                  className={`block px-4 py-2 cursor-pointer text-sm text-black ${
                                    active
                                      ? "bg-white translate-x-1 transition-all duration-300 text-red"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleMenuItemClick(
                                      `${category?.attributes?.CategoryName}`
                                    )
                                  }
                                >
                                  {category?.attributes?.CategoryName}
                                </a>
                              )}
                            </MenuItem>
                          ))
                        ) : (
                          <p>No categories available</p>
                        )}
                      </div>
                    </MenuItems>
                  </Menu>  */}

                  <input
                    type="button"
                    value="Search"
                    className="bg-red p-2 rounded-tr-lg shadow-2xl rounded-br-lg text-yellow font-semibold hover:bg-red/85 transition-colors"
                    onClick={handleSearch}
                  />
                </div>
              </div>
            </div>

            {/* Right section for the search input, cart, and profile icon */}
            <div className="relative flex items-center space-x-1 sm:space-x-4">
              {/* <div className="flex w-10 shadow-lg items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-yellow bg-white p-5">
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="pointer-events-none absolute w-5 fill-red transition"
                    >
                      <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                    </svg>
                  </div> */}
              <Link
                to={"/cart"}
                className="text-red relative hover:-translate-y-1 transition-all duration-300 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="sm:w-8 sm:h-8 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span className="absolute -bottom-2 -right-2 bg-red   text-yellow rounded-full text-[13px] px-1.5 py-0 sm:px-2 sm:py-0.5 h-fit">
                  {totalQuantity}
                </span>
              </Link>

              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex items-center  text-red hover:scale-105 duration-300 outline-none  rounded-full p-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="sm:w-8 sm:h-8 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    {!isLogin ? (
                      <h4 onClick={openModal}  className="flex  text-[10px] sm:text-[14px]  font-bold items-start flex-col gap-0">
                        Hello
                        <span className="text-[10px] sm:text-[14px]  font-[900]">
                          Log In?
                        </span>
                      </h4>
                    )
                      : (
                        <h4 className="flex  text-[10px] sm:text-[14px]  font-bold items-start flex-col gap-0">
                          Hello 
                          <span className="text-[10px] sm:text-[14px]  font-[900]">
                            {user?.length > 10 ? user?.substring(0,10) : user}
                          </span>
                        </h4>
                      )}
                  </Menu.Button>

                </div>

                {isLogin && (
                  <div className="">

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >

                      <Menu.Items className="absolute right-0 mt-4 w-48 bg-white shadow-red rounded-md shadow-lg z-20">
                        <Menu.Item>
                          {({ active, close }) => (
                            <a
                              onClick={() => { close() }}
                              href={'/profile'}
                              className={`block px-4 py-2 font-bold text-md  text-red ${active ? "bg-red text-white" : ""
                                }`}
                            >

                              Profile
                            </a>

                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active, close }) => (
                            <a
                              href="#"
                              className={`block px-4 py-2 font-bold text-md text-red ${active ? "bg-red  text-white" : ""
                                }`}
                              onClick={() => {
                                handleLogout();
                                close(); // Close the menu after logout
                              }}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>

                    </Transition>
                  </div>

                )}
              </Menu>
              {/* Hamburger menu for mobile screens */}
              <div className="relative">
                {/* Menu Button */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-red "
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

                {/* Drawer Sidebar */}
                <div
                  className={`fixed top-0 right-0 h-full w-64 z-[9999] bg-cover bg-white bg5 shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50`}
                >
                  <div className="flex justify-between p-4 ">
                    <a href="/" className="text-xl font-bold text-red">
                      {/* <img
                        className="h-16"
                        src="https://api.shriworks.com/uploads/logoo_d8327e38ee.png"
                        alt="Shriworks Logo"
                      /> */}
                      <h3  className="text-xl font-bold text-red">Shivyantra</h3>
                    </a>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-red "
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 pt-2 pb-3  space-y-1">
                    <Link
                      to={"/"}
                      className="text-red hover:text-black block px-3 py-2 rounded-md text-base font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Popover className="relative text-red outline-none px-3 py-2 border-none">
                      <Popover.Button className="flex outline-none gap-1 font-bold items-center">
                        Categories
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </Popover.Button>
                      <Popover.Panel className="flex flex-col mt-2 text-black hover:text-red cursor-pointer shadow-lg shadow-red  px-4 py-2 rounded-xl">
                        {Array.isArray(Cate) ? (
                          Cate.map((category, index) => (
                            <a
                              className="hover:text-red "
                              key={index}
                              onClick={() => {
                                handleMenuItemClick(category?.attributes?.CategoryName);
                                setIsMenuOpen(false); // Close the drawer when a category is clicked
                              }}
                            >
                              {category?.attributes?.CategoryName}
                            </a>
                          ))
                        ) : (
                          <p>No categories available</p>
                        )}
                      </Popover.Panel>
                    </Popover>
                    <Link
                      to={"/shop"}
                      className="text-red hover:text-black block px-3 py-2 rounded-md text-base font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Link
                      to={"/about"}
                      className="text-red hover:text-black block px-3 py-2 rounded-md text-base font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      to={"/blog"}
                      className="text-red hover:text-black block px-3 py-2 rounded-md text-base font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link
                      to={"/contact"}
                      className="text-red hover:text-black block px-3 py-2 rounded-md text-base font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                    {/* <a
                      // href="https://www.shriworkscraft.com/"
                      href="/"
                      // target="_blank"
                      className="text-red hover:text-black block px-3 py-2 rounded-md text-base font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Factory
                    </a> */}
                  </div>
                </div>

                {/* Overlay */}
                {isMenuOpen && (
                  <div
                    className="fixed inset-0 bg-red opacity-50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className=" lg:hidden items-center justify-center ">
        <div className="rounded-lg  p-2">
          <div className="flex">
            <div className="flex w-10 items-center shadow-lg justify-center rounded-tl-lg rounded-bl-lg border-r border-yellow bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-red transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-full bg-white text-black shadow-lg pl-2 text-base font-semibold outline-0"
              placeholder="Search product..."
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search-product"
              autoComplete="off"
            />

            {/* Dropdown here */}
            {/* <Menu as="div" className="relative  ">
              <div>
                <MenuButton className="flex border-l  border-yellow  items-center w-max justify-center  shadow-lg bg-white p-3 text-sm font-semibold text-black ">
                  {selectedCategory}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-black"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-50 mt-2 w-56 overflow-hidden origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-black ${active
                          ? "bg-white translate-x-1 transition-all duration-300 text-red"
                          : ""
                          }`}
                        onClick={() => handleMenuItemClick("All Categories")}
                      >
                        All Categories
                      </a>
                    )}
                  </MenuItem>
                  {Array.isArray(Cate) ? (
                    Cate.map((category, index) => (
                      <MenuItem key={index}>
                        {({ active }) => (
                          <a
                            className={`block px-4 py-2 cursor-pointer text-sm text-black ${active
                              ? "bg-white translate-x-1 transition-all duration-300 text-red"
                              : ""
                              }`}
                            onClick={() =>
                              handleMenuItemClick(`${category?.attributes?.CategoryName}`)
                            }
                          >
                            {category?.attributes?.CategoryName}
                          </a>
                        )}
                      </MenuItem>
                    ))
                  ) : (
                    <p>No categories available</p>
                  )}
                </div>
              </MenuItems>
            </Menu> */}

            <input
              type="button"
              value="Search"
              className="bg-red p-2 rounded-tr-lg rounded-br-lg text-yellow font-semibold hover:bg-red/85 transition-colors"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <Login setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
    </>
  );
};

export default TopNav;
