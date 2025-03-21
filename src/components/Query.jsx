import React, { useRef } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from '../Utils/api';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import '../pages/ProductDetails/ProductDetails.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, toast } from 'react-toastify';
import { addItem } from '../Slice/cartSlice';
import CartSidebar from '../pages/AddToCart/CartSideBar';
import { FaStar } from "react-icons/fa";
import Loading from '../components/Loading/Loading';
let JWT;

if (localStorage.getItem('RegJWT')) {
  JWT = localStorage.getItem('RegJWT');
} else if (localStorage.getItem('LoginJWT')) {
  JWT = localStorage.getItem('LoginJWT');
} else {
  JWT = null;
}

let UserId;
if (localStorage.getItem("RegUserId")) {
  UserId = localStorage.getItem("RegUserId");
} else if (localStorage.getItem("LoginUserId")) {
  UserId = localStorage.getItem("LoginUserId");
}

const ProductDetails = () => {
  const baseUrl = api.defaults.baseURL;
  const Id = useParams();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [enableRefetch, setEnableRefetch] = useState(false);



  const ProductId = Id.id;
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [disableCart, setDisableCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // console.log(cartItems,'items in the cart');

  useEffect(() => {
    const isDisabled = cartItems.some((item) => {
      // console.log(Number(ProductId),item?.product?.id,"IDS")
      if (item?.product?.id === Number(ProductId)) {
        return item?.Quantity >= item?.product?.AvailableQuantity;
      }

    });
    setDisableCart(isDisabled);
    // console.log(isDisabled,'able dis-able');
  }, [cartItems, ProductId]);


  // console.log(disableCart,'DIsabling cart');


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { data: products, isError } = useQuery(['Products', Id], async () => {
    const res = await api.get(`/api/Products/${ProductId}?populate=*`);
    return res.data.data;
  }, {
    enabled: !!Id
  }
  );

  const { data: Review } = useQuery('Reviews', async () => {
    const res = await api.get(`/api/Products/${ProductId}?populate[0]=reviews&populate[1]=reviews.Image&populate[2]=reviews.users_permissions_user`);
    return res.data.data;
  });

  // console.log(products,'Details of the Products')

  const category = products?.attributes?.category?.data?.attributes?.CategoryName;

  const [selectedMedia, setSelectedMedia] = useState(products?.attributes?.ProductImage?.data[0]?.attributes?.url || '');

  const productImages = products?.attributes?.ProductImage?.data || [];

  useEffect(() => {
    if (productImages?.length > 0) {
      setSelectedMedia(productImages[0]?.attributes?.url || '');
    }
  }, [productImages]);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };



  const handleScroll = (direction) => {
    const scrollAmount = direction === 'up' ? -scrollRef.current.clientHeight : scrollRef.current.clientHeight;
    scrollRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  };

  const sendCartToStrapi = async () => {
    if (JWT) {
      try {
        const response = await api.post('/api/carts', {
          data: {
            product:
              products?.id,
            user: UserId,
            Quantity: quantity,
          },
        });
      } catch (error) {
        // Handle error
        // toast.error('Product ');
        // console.error('Error:', error);
      }
    } else {
      setIsOpen(true);
      toast.error('Please login to add your product to cart');
    }
  };

  const addToCartHandler = () => {
    sendCartToStrapi()
    dispatch(
      addItem({
        id: products?.id,
        name: products.attributes.ProductName,
        price: products.attributes.NewPrice,
        image: `${baseUrl}${products?.attributes.ProductImage.data[0]?.attributes.url}`,
        quantity: Number(quantity),
      })
    );
    setSidebarOpen(true);
    setEnableRefetch(true);
    toast.success('Product added to cart!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setTimeout(() => {
      setEnableRefetch(false);
    }, 500);
  }

  const handleRefetch = () => {
    setEnableRefetch(false); // Reset after handling
  };


  const discountedPrice = (products?.attributes?.Offer / 100) * products?.attributes?.Price;
  const OfferPrice = products?.attributes?.Price - discountedPrice;

  const handleBuyNow = () => {
    sendCartToStrapi();
    dispatch(
      addItem({
        id: products?.id,
        name: products.attributes.ProductName,
        price: products.attributes.NewPrice,
        image: `${baseUrl}${products?.attributes.ProductImage.data[0]?.attributes.url}`,
        quantity: Number(quantity),
      })
    );
    setIsLoading(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 2000)
  }

  if (isLoading) return <Loading />;

  // Submit the review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserId) {
      toast.error("Please login to review the product");
      return;
    }

    if (rating && comment) {
      try {
        const response = await api.post(`/api/reviews`, {
          data: {
            users_permissions_user: UserId,
            product: products?.id,
            Rating: rating,
            Review: comment,
          },
        });

        toast.success("Review submitted successfully!");
        // Clear the form or reset states if needed
        setRating(0);
        setComment("");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      toast.error("Please fill in both fields");
    }

  };
  return (
    <div className="lg:p-10 p-5">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 ">
        <div className="bg-gradient-to-r from-red via-black sm:h-fit to-black sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="px-4 py-8 sm:overflow-auto  space-y-4">
        
                      <div className="flex flex-row gap-2 sticky top-0 items-center justify-center">
                        {/* Thumbnails Carousel */}
                        <div className="w-1/4 lg:mb-0">
                          {productImages.length > 0 ? (
                            <div className="vertical-carousel-container">
                              <button className="custom-arrow up-arrow" onClick={() => handleScroll('up')}>↑</button>
                              <div className="carousel-content" ref={scrollRef}>
                                {productImages.map((media, index) => (
                                  <div
                                    key={index}
                                    className="carousel-item cursor-pointer"
                                    onClick={() => setSelectedMedia(media.attributes?.url)}
                                  >
                                    {media.attributes?.url.endsWith('.mp4') ? (
                                      <video
                                        src={`${baseUrl}${media.attributes?.url}`}
                                        alt={`Thumbnail Video ${index}`}
                                        className="w-full h-auto border border-gray-300 rounded"
                                        muted
                                        controls={false}
                                      />
                                    ) : (
                                      <img
                                        src={`${baseUrl}${media.attributes?.url}`}
                                        alt={`Thumbnail ${index}`}
                                        className="w-full h-auto border border-gray-300 rounded"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                              <button className="custom-arrow down-arrow" onClick={() => handleScroll('down')}>↓</button>
                            </div>
                          ) : (
                            <p>No media available</p>
                          )}
                        </div>
        
                        {/* {console.log(selectedMedia,'selected media')} */}
                        {/* Main Media with Zoom or Video */}
                        <div className="w-3/4 flex items-center justify-center">
                          {selectedMedia ? (
                            selectedMedia.endsWith('.mp4') ? (
                              <div className="relative h-auto w-full z-50">
                                <video
                                  src={`${baseUrl}${selectedMedia}`}
                                  className="w-full h-auto"
                                  controls
                                  autoPlay
                                  muted
                                />
                              </div>
                            ) : (
                              <div className="relative h-full w-full cursor-zoom-in z-30 object-cover">
                                <ReactImageZoom
                                  img={`${baseUrl}${selectedMedia}`}
                                  zoomLensStyle={`opacity:1,background-color:#000`}
                                />
                              </div>
                            )
                          ) : (
                            <p>No media selected</p>
                          )}
                        </div>
                      </div>
        
          </div>
     
        </div>

        <div className="max-w-4xl w-full bg-black h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-yellow">Complete your order</h2>
          <div className="data w-full lg:pr-8 pr-0 xl:justify-start relative  lg:justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                <div className="data sm:w-full max-w-xl">
                  <p className="text-lg font-medium leading-8 text-red mb-4">
                    Category&nbsp; /&nbsp; {products?.attributes?.category?.data?.attributes?.CategoryName}
                  </p>
                  <h2 className="font-bold text-3xl  text-red mb-2 capitalize">
                    {products?.attributes?.ProductName}
                  </h2>
                  <h3 className="font-bold text-xl  text-black mb-2 capitalize">
                    {products?.attributes?.SubTitle}
                  </h3>

                  <div className="flex flex-row gap-2 sm:flex-row  sm:items-center mb-6">
                    {products?.attributes?.Offer ? (
                      <>
                        <h6 className="font-manrope font-semibold text-3xl leading-9 text-green  sm:border-r border-gray-200 ">
                          &#8377;{OfferPrice}
                        </h6>
                        <h6 className="font-manrope  font-semibold text-xl line-through leading-9 text-black  sm:border-r border-gray-200">
                          &#8377;{products?.attributes?.Price}
                        </h6>
                        <span className="text-xl text-red font-bold"> {products?.attributes?.Offer}{" "}% Off</span>
                      </>
                    ) : (
                      <h6 className="font-manrope font-semibold text-3xl leading-9 text-green  sm:border-r border-gray-200">
                        &#8377;{products?.attributes?.Price}
                      </h6>
                    )}
                  </div>
                  <div className="flex flex-col gap-2   mb-6">
                    <h6 className="font-manrope font-normal text-xl  text-red  sm:border-r border-gray-200 ">
                      <span className="font-bold">Code -</span> {products?.attributes?.SKU}
                    </h6>
                    <h6 className="font-manrope font-normal text-xl  text-red  sm:border-r border-gray-200 ">
                      <span className="font-bold">Weight -</span> {products?.attributes?.Weight} Kg
                    </h6>
                    <h6 className="font-manrope font-normal text-xl  text-red  sm:border-r border-gray-200 ">
                      <span className="font-bold">Dimensions <span className='font-semibold text-lg'>(Height x Width)</span> -</span> {products?.attributes?.Dimensions}
                    </h6>
                    {
                      products?.attributes?.AvailableQuantity === 0 || disableCart || products?.attributes?.AvailableQuantity === null ? null : (<h6 className="font-manrope font-normal text-2xl  text-black  sm:border-r border-gray-200 ">
                        <span className="font-bold text-red text-xl">Available Quantity -</span> Only {products?.attributes?.AvailableQuantity} left
                      </h6>)
                    }
                  </div>
                  <>
                    <div className="flex  gap-3 py-2">
                      {products?.attributes?.AvailableQuantity === 0 || disableCart || products?.attributes?.AvailableQuantity === null ?
                        (
                          <p className='text-yellow px-2 py-1 rounded font-bold text-2xl bg-red'>Out Of Stock</p>
                        ) : (
                          <>
                            <div className="flex sm:items-center gap-3  ">
                              <select
                                aria-label="Select quantity"
                                class="py-2 px-3 bg-white rounded-md text-black mr-6 focus:outline-none "
                                onChange={(e) => setQuantity(e.target.value)}
                                value={quantity}
                              >
                                {Array.from({ length: products?.attributes?.AvailableQuantity }, (_, i) => (
                                  <option key={i} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className='flex flex-col sm:pl-0 pl-10 sm:flex-row gap-2'>
                              <button className={`group py-2  rounded-full bg-red text-yellow font-semibold text-lg px-10 flex items-center justify-center gap-2 transition-all hover:scale-105 duration-500 disabled:opacity-45 disabled:cursor-not-allowed`}
                                disabled={products?.attributes?.AvailableQuantity === 0 || products?.attributes?.AvailableQuantity === null}
                                onClick={addToCartHandler}>
                                <svg
                                  className="stroke-yellow font-bold "
                                  width="24"
                                  height="24"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                    stroke=""
                                    stroke-width="2.6"
                                    stroke-linecap="round"
                                  />
                                </svg>
                                Add to cart
                              </button>
                              <button className={`group py-2  rounded-full bg-black text-yellow font-semibold text-lg px-10 flex items-center justify-center gap-2 transition-all hover:scale-105 duration-500 disabled:opacity-45 disabled:cursor-not-allowed `}
                                disabled={products?.attributes?.AvailableQuantity === 0 || products?.attributes?.AvailableQuantity === null}
                                onClick={handleBuyNow}>
                                Buy Now
                              </button>
                            </div>
                          </>
                        )}
                    </div>
                  </>

                  <div className="mt-2 flex flex-col gap-2">
                    <h4 className="text-xl text-red font-bold uppercase">
                      Shipping Info{" "}
                    </h4>
                    <p className="text-black text-base font-normal ">
                      Dispatched in a maximum of 7-10 business days. This item is
                      not eligible for return. Cancellation requests will be
                      accepted strictly within 24 hours of placing the order only.
                      This product is made on order.
                    </p>
                    <p className="text-black text-base font-semibold ">
                      (For ordering out of India please Contact us in Whatsapp.
                      Website shipment only within India.)
                    </p>
                  </div>
                  <div className="md:pt-5 pt-0 mb-10 px-4 lg:px-16 flex flex-col gap-3">
            <h2 className="text-xl text-red font-bold uppercase"> Highlights</h2>

            <ul className='text-base list-disc list-inside text-black font-semibold text-justify'>
              {products?.attributes?.Description?.length > 0 ? (
                products.attributes?.Description.map((desc, index) => (
                  <li className='mb-2' key={index}>
                    {desc?.children?.[0]?.children?.[0]?.text}
                  </li>
                ))
              ) : (
                <li className='mb-2'>No descriptions available.</li>
              )}
            </ul>

          </div>
                  
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
