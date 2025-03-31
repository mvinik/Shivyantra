import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import FreeDeliveryProgress from "../../components/Query";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCartItems,
  RemoveCartItem,
  AddCartItem,
  DeleteCartItem,
} from "../../Slice/cartSlice";
import api from "../../Utils/api";

const baseUrl = api.defaults.baseURL;
let UserId;
if (localStorage.getItem("RegUserId")) {
  UserId = localStorage.getItem("RegUserId");
} else if (localStorage.getItem("LoginUserId")) {
  UserId = localStorage.getItem("LoginUserId");
}
const AddToCart = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const { data: cart, isError, isLoading } = useQuery('getCart', async () => {
    const res = await api.get(`/api/users/${UserId}?populate=carts.product.ProductImage`)
    // console.log(cart,'USSER"S CART')
    return res.data
  }, {
    onSuccess: (data) => {
      // console.log(data,'SetCartItems')
      dispatch(setCartItems(data.carts))
    }
  })
  // console.log(cart,'List of items in the cart');

  const RemoveItem = async (cartId) => {
    try {
      await dispatch(RemoveCartItem({
        cartId,
      })).unwrap();
      toast.success("Item Removed Successfully");
      queryClient.invalidateQueries('getCart');
    } catch (error) {
      console.log(error)
    }
  }

  const AddItem = async (cartId) => {
    try {
      await dispatch(AddCartItem({
        product: cartId,
        user: UserId,
        Quantity: 1
      }))
      toast.success("Item Added Successfully");
      queryClient.invalidateQueries('getCart');
    } catch (error) {
      console.log(error)
      toast.error('Failed to add item to cart');
    }
  }

  const RemoveCart = async (cartId) => {
    try {
      await dispatch(DeleteCartItem({
        cartId,
      })).unwrap();
      toast.success("Item Removed from the Cart");
      queryClient.invalidateQueries('getCart');
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <Loading />;

  if (cart?.carts?.length === 0 || cart?.carts === undefined || cart?.carts === null) {
    return (
      <div className="flex p-5 sm:p-10 flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#4e2a1b"
          className="size-52"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <h1 className="text-2xl text-red font-bold"> Your Cart is Empty</h1>
        <Link
          to={"/shop"}
          className="mt-4 text-sm sm:text-xl hover:bg-opacity-90 cursor-pointer bg-red text-white px-3  py-2 rounded-lg"
        >
          Continue Shopping{" "}
        </Link>
      </div>
    );
  }

  return (<>
 {/* <div className="sm:block p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cart?.carts?.map((item) => (
          <li
            key={item.id}
            className="flex sm:flex-row gap-3 flex-col justify-between items-center mb-4 p-2 sm:p-4 border-b  border-black  rounded-md shadow-md"
          >
            <div className="flex justify-center items-center gap-2">
              <div className="bg-red sm:w-24 w-1/2 p-1 rounded-md">
                <img
                  className="h-20 w-full object-cover"
                  src={`${baseUrl}${item.product?.ProductImage[0]?.url}`} // Adjust for nested product data
                  alt={item.product?.ProductName}
                />
              </div>
              <div className="">
                <h3 className="text-sm lg:text-lg text-red font-semibold">
                  {item.product?.ProductName}
                </h3>
                {item?.product?.AvailableQuantity ? (
                <>
                  {item.product?.Offer ? (
                      <p className="text-black font-bold">
                      &#8377;{(item?.product?.Price - ((item.product?.Offer/100) * item.product?.Price))} x {item.Quantity} = &#8377;
                      {( (item?.product?.Price - ((item.product?.Offer/100) * item.product?.Price)) * item.Quantity)}
                    </p>
                  ):(
                    <p className="text-black font-bold">
                    &#8377;{item.product?.Price?.toFixed(2)} x {item.Quantity} = &#8377;
                    {(item.product?.Price * item.Quantity).toFixed(2)}
                  </p>
                  )}
                </> 
                )
                : (null)  }
                 
              </div>
            </div>
            {item?.product?.AvailableQuantity ? (
               <div className="flex items-center">
               <button
                 // onClick={() => dispatch(decreaseQuantity(item.product.id))}
                 onClick={()=>RemoveItem(item.id)}
                 className="px-3 py-1 bg-red border-red border-t border-b text-white rounded-l-md hover:bg-red-600"
               >
                 -
               </button>
               <span className="px-4 py-1 border-red border-t border-b">
                 {item.Quantity}
               </span>
               <button
                 onClick={() => {AddItem(item.product.id)}}
                 disabled={item.product.AvailableQuantity===0 || item.product.AvailableQuantity === null || item.product.AvailableQuantity <= item.Quantity}
                 className={`px-3 py-1 bg-red border-red border-t border-b text-white rounded-r-md hover:bg-green-600 disabled:opacity-35 disabled:cursor-not-allowed`}
               >
                 +
               </button>
               <button
                 onClick={() => RemoveCart(item.id)}
                 className="ml-4 px-3 py-1 bg-[#000000]  text-white rounded-md hover:bg-red"
               >
                 Remove
               </button>
             </div>
            ) : (
              <p className="text-red font-bold">Out of Stock</p>
            )}
           
          </li>
        ))}
      </ul>
      <div className="mt-10 flex sm:flex-row flex-col gap-2 justify-between items-center">
        <div className="flex flex-col font-bold rounded-xl p-3 gap-1">
          <p className="text-lg flex justify-between text-black">
            Total Items: <span className="font-semibold">{totalQuantity}</span>
          </p>
          <p className="text-lg flex justify-between text-black">
            Total Amout:{" "}
            <span className="ml-1 font-semibold">
            &nbsp; &#8377;{" "}{totalAmount}
            </span>
          </p>
        </div>
        <Link
          to={"/checkout"}
          className="px-6 py-2 bg-green text-white font-bold rounded-md hover:bg-opacity-80"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>  */}
<div className="p-4 mt-5">
<h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <FreeDeliveryProgress cartTotal={totalAmount.toFixed(2)} />
  {/* Large view Table */}
  <div className="hidden md:block overflow-hidden  ">
  <table className="w-full border-collapse ">
        <thead>
          <tr className="bg-gray-100 text-lg text-left">
            <th></th>
            <th className=" px-4 py-2">Product</th>
            <th className=" px-4 py-2">Product Name</th>
            <th className=" px-4 py-2">Quantity</th>
            <th className=" px-4 py-2">Price</th>
            <th className=" px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart?.carts?.map((item, index) => (<>
            <tr key={item.id} className="text-left   mb-4 rounded-md shadow-red shadow-sm ">
              <td className=" p-2 "><button
               onClick={() => RemoveCart(item?.id)}
               className="ml-auto  text-red-600  p-2 text-center text-black rounded-md text-opacity-80">
                x
                </button></td>
              <td className=" p-4 ">
              
                <img
                  src={`${baseUrl}${item.product?.ProductImage[0]?.url}`}
                  className="h-20 w-20 object-cover rounded"
                  alt={item.product.ProductName}
                />
              </td>
              <td className=" text-sm uppercase p-4">{item.product.ProductName}</td>

              <td className=" p-4">
             
                     {item?.product?.AvailableQuantity ? (
                      <div className="flex items-center">
                      <button
                        // onClick={() => dispatch(decreaseQuantity(item.product.id))}
                        onClick={()=>RemoveItem(item.id)}
                        className="px-3 py-1 bg-red border-red border-t border-b text-white rounded-l-md hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-red border-t border-b">
                        {item.Quantity}
                      </span>
                      <button
                        onClick={() => {AddItem(item.product.id)}}
                        disabled={item.product.AvailableQuantity===0 || item.product.AvailableQuantity === null || item.product.AvailableQuantity <= item.Quantity}
                        className={`px-3 py-1 bg-red border-red border-t border-b text-white rounded-r-md hover:bg-green-600 disabled:opacity-35 disabled:cursor-not-allowed`}
                      >
                        +
                      </button>
                      {/* <button
                        onClick={() => RemoveCart(item.id)}
                        className="ml-4 px-3 py-1 bg-black  text-white rounded-md hover:bg-opacity-80"
                      >
                        x
                      </button> */}
                    </div>
                   ) : (
                     <p className="text-red font-bold">Out of Stock</p>
                   )}
              </td>
              <td className="p-4">
                <>
                  {item.product?.Offer ? (
                    <p className="text-black font-bold">
                      &#8377;{(item?.product?.Price - ((item.product?.Offer / 100) * item.product?.Price))}
                    </p>
                  ) : (
                    <p className="text-black font-bold">
                      &#8377;{item.product?.Price?.toFixed(2)}
                    </p>
                  )}</>
              </td>
              <td className="p-4" >
                {item?.product?.AvailableQuantity ? (
                  <>
                    {item.product?.Offer ? (
                      <p className="text-black font-bold">
                        {/* &#8377;{(item?.product?.Price - ((item.product?.Offer/100) * item.product?.Price))} x {item.Quantity} =  */}
                        &#8377;
                        {((item?.product?.Price - ((item.product?.Offer / 100) * item.product?.Price)) * item.Quantity)}
                      </p>
                    ) : (
                      <p className="text-black font-bold">
                        {/* &#8377;{item.product?.Price?.toFixed(2)} x {item.Quantity} =  */}
                        &#8377;
                        {(item.product?.Price * item.Quantity).toFixed(2)}
                      </p>
                    )}
                  </>
                )
                  : (null)}

              </td>

            </tr>
            {/* <tr><td colSpan="5"><hr className="my-2  border-black" /></td></tr> */}
          </>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center">
      <div className="m-10 flex flex-col   gap-4   ">
  <div className="flex flex-col font-bold p-3 gap-1 w-full lg:w-auto">
    <p className="text-lg flex justify-between text-black pb-2">
      Total Items: <span className="font-semibold">{totalQuantity}</span>
    </p>
    <p className="text-lg flex justify-between text-black pb-2">
      Total Amount: <span className="ps-2 font-semibold">&#8377; {totalAmount}</span>
    </p>
  </div>
  <Link
    to={"/checkout"}
    className="px-6 py-2 bg-green text-white font-bold rounded-md hover:bg-green w-full lg:w-auto text-center"
  >
    Proceed to Checkout
  </Link>
 
</div> 
      </div>
  </div>

  {/* Mobile View - Card Layout */}
  <div className="block md:hidden flex flex-col gap-4">
    {cart?.carts?.map((item) => (
      <div key={item.id} className=" flex  flex-row  gap-2 mb-4 rounded-md shadow-red shadow-sm ">
     
        <div className="flex items-center justify-between gap-5 m-3  ">
        <button
               onClick={() => RemoveCart(item?.id)}
               className="ml-auto  text-red-600  p-2 text-center text-black rounded-md text-opacity-80">
                x
                </button>
          <img
            src={`${baseUrl}${item.product?.ProductImage[0]?.url}`}
            className="h-20 w-20 object-cover rounded"
            alt={item.product.ProductName}
          />
          <div className="flex flex-col">
            <p className="text-sm uppercase font-bold">{item.product.ProductName}</p>
            <p className="text-black font-bold">
              Price: &#8377;{item.product?.Offer
                ? (item?.product?.Price - ((item.product?.Offer / 100) * item.product?.Price))
                : item.product?.Price?.toFixed(2)}
            </p>
            <p className="text-black font-bold">
              Total: &#8377;{item.product?.Offer
                ? ((item?.product?.Price - ((item.product?.Offer / 100) * item.product?.Price)) * item.Quantity)
                : (item.product?.Price * item.Quantity).toFixed(2)}
            </p>
            <div className="flex items-center mt-2">
             
            {item?.product?.AvailableQuantity ? (
                      <div className="flex items-center">
                      <button
                        // onClick={() => dispatch(decreaseQuantity(item.product.id))}
                        onClick={()=>RemoveItem(item.id)}
                        className="px-3 py-1 bg-red border-red border-t border-b text-white rounded-l-md hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-red border-t border-b">
                        {item.Quantity}
                      </span>
                      <button
                        onClick={() => {AddItem(item.product.id)}}
                        disabled={item.product.AvailableQuantity===0 || item.product.AvailableQuantity === null || item.product.AvailableQuantity <= item.Quantity}
                        className={`px-3 py-1 bg-red border-red border-t border-b text-white rounded-r-md hover:bg-green-600 disabled:opacity-35 disabled:cursor-not-allowed`}
                      >
                        +
                      </button>
                      {/* <button
                        onClick={() => RemoveCart(item.id)}
                        className="ml-4 px-3 py-1 bg-black  text-white rounded-md hover:bg-red"
                      >
                        Remove
                      </button> */}
                    </div>
                   ) : (
                     <p className="text-red font-bold">Out of Stock</p>
                   )}
            </div>
          </div>
        </div>
     
      </div>
    ))}
    <div className="m-10 flex flex-col lg:flex-row gap-4 justify-between items-center">
  <div className="flex flex-col font-bold rounded-xl p-3 gap-1 w-full lg:w-auto">
    <p className="text-lg flex justify-between text-black">
      Total Items: <span className=" font-semibold">{totalQuantity}</span>
    </p>
    <p className="text-lg flex justify-between text-black">
      Total Amount: <span className="ps-2 font-semibold">&#8377; {totalAmount}</span>
    </p>
  </div>
  <Link
    to={"/checkout"}
    className="px-6 py-2 bg-green text-white font-bold rounded-md hover:bg-green w-full lg:w-auto text-center"
  >
    Proceed to Checkout
  </Link>
  {/* <Link
        to={"/shop"}
        className="px-6 py-2 bg-red text-white font-bold w-full text-center rounded-md hover:bg-opacity-80"
      >
        Continue to Shopping
      </Link> */}
</div>
  </div>

  {/* Cart Summary & Checkout */}
  {/* <div className="m-10 flex flex-col hidden lg:block lg:flex-row  gap-4 justify-between items-center  ">
  <div className="flex flex-col font-bold p-3 gap-1 w-full lg:w-auto">
    <p className="text-lg flex justify-between text-black">
      Total Items: <span className="font-semibold">{totalQuantity}</span>
    </p>
    <p className="text-lg flex justify-between text-black">
      Total Amount: <span className="ml-1 font-semibold">&#8377; {totalAmount}</span>
    </p>
  </div>
  <Link
    to={"/checkout"}
    className="px-6 py-2 bg-green text-white font-bold rounded-md hover:bg-green w-full lg:w-auto text-center"
  >
    Proceed to Checkout
  </Link>
  <>
  </>
</div> */}
{/* <div className="flex justify-center mt-4">
  <Link
    to="/shop"
    className="px-6 py-2 bg-red text-white font-bold text-center rounded-md hover:bg-opacity-80"
  >
    Continue to Shopping
  </Link>
</div> */}

</div>


    {/* <button className="mx-auto justify-center items-center">
      <Link
        to={"/shop"}
        className="px-6 py-2 bg-red text-white font-bold   rounded-md hover:bg-opacity-80"
      >
        Continue to Shopping
      </Link>
    </button> */}

  </>
  );
};

export default AddToCart;
