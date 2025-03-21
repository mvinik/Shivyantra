import { LockClosedIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { ClearCart, clearCart, setCartItems } from '../../Slice/cartSlice';
import api from '../../Utils/api';
const baseUrl = api.defaults.baseURL;

let UserId;
if(localStorage.getItem("RegUserId")){
  UserId = localStorage.getItem("RegUserId");
}else if(localStorage.getItem("LoginUserId")){
  UserId = localStorage.getItem("LoginUserId");
}

let JWT;

if(localStorage.getItem('RegJWT')){
  JWT = localStorage.getItem('RegJWT');
}else if(localStorage.getItem('LoginJWT')){
  JWT = localStorage.getItem('LoginJWT');
}else {
  JWT = null;
}

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  // console.log(cartItems,'items in the cart');
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [Delivery, setDelivery] = useState(0);
  const [zip, setZip] = useState('');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const {data:cart, isError} = useQuery('getCart',async() =>{
  const res = await api.get(`/api/users/${UserId}?populate=carts.product.ProductImage`)
  // console.log(cart,'USSER"S CART')
    return res.data
  },{
    onSuccess:(data) =>{
      // console.log(data,'SetCartItems')
      dispatch(setCartItems(data.carts))
    }
  })

// console.log(cart,'Cart checkout')
// console.log(cartItems,'cartItems checkout') 


  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!firstName) tempErrors.firstName = "First Name is required";
    if (!lastName) tempErrors.lastName = "Last Name is required";
    if (!email) tempErrors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email is invalid";
    if (!phone) tempErrors.phone = "Phone number is required";
    if (phone && !/^\d{10}$/.test(phone)) tempErrors.phone = "Phone number should be 10 digits";
    if (!address) tempErrors.address = "Address is required";
    if (!city) tempErrors.city = "City is required";
    if (!state) tempErrors.state = "State is required";
    if (!zip) tempErrors.zip = "Zip Code is required";
    
    setErrors(tempErrors);
    if(Object.keys(tempErrors).length >= 1)  toast.error('Fill All The Required Information')
    return Object.keys(tempErrors).length === 0;  // If no errors, return true
  };
  
  const handleStateChange = (e) => {
    const value = e.target.value;
    setState(value); // Update the state
    
    if (!value) {
      setErrors((prev) => ({ ...prev, state: 'State is required' }));
    } else {
      setErrors((prev) => ({ ...prev, state: '' }));
      mutate(value); // Pass the updated state value directly to the mutate function
    }
  };


  const {mutate} =  useMutation(
    async (state) => {
      if (state) {
        const response = await api.post(`/api/get/delivery/${state}/${UserId}`);
        // console.log('State POsted Response',response.data)
        setDelivery(response?.data?.deliveryCharge)
        return response.data;
      }
    },
    {
      onSuccess: () => {
        // Invalidate queries that need to be refreshed after the mutation
        queryClient.invalidateQueries('delivery'); // your query key
        // console.log('State change successful, queries invalidated');
      },
      onError: (error) => {
        console.log(error, 'Error during state change');
      },
    }
  )

  const SendAddress = async () =>{
    if(address && phone && city && state && zip){
      // console.log(" Address",address , phone ,city , state, zip)
      const res = await api.put(`api/users/${UserId}`, {
          Address : address,
          Mobile:phone,
          City : city,
          State : state,
          Pincode : zip,
          Landmark:landmark,
      });
      // console.log("Address update",res.data);
      return res.data;
    }
  }


  const option = {
    headers: {
    'Authorization':`Bearer ${JWT}`
    },
    };

    if(isLoading) return <Loading/>;
    // console.log(totalAmount,'total amout')

  const handlePayment = async (e) => {
    e.preventDefault();
    SendAddress();
    if (validateForm()) {
      try {
        const response = await api.get(`/api/razorpay`);
        const amount =(totalAmount+Delivery);
        const orderResponse = await api.post(`/api/contests/${amount}/create-order`, {}, option);
        const order = orderResponse.data;
        // console.log(orderResponse,'orderResponse')
        // console.log(response.data.data.attributes.KeyId,'API KEY')
        // console.log(response.data.data.attributes.KeySecret,'SECRET KEY')
        var options = {
          key: `${response.data.data.attributes.KeyId}`,
          key_secret: `${response.data.data.attributes.KeySecret}`,
          amount: order.amount,
          currency: "INR",
          order_id: order.id,
          name: "Shriworks",
          method: {
            netbanking: true,
            card: true,
            upi: true, // Enable UPI but exclude QR-based UPI payments
            wallet: true,
            QR: true,
          },
          handler: async(Paymentresponse) =>{
            try {
              const res = await api.post(`/api/product/${Paymentresponse.razorpay_payment_id}/payment`,{},option);
              // console.log(res,'PayemtnResponse')
              toast.success('Order Placed successfully');
              setIsLoading(true);
              dispatch(ClearCart(UserId));
              setTimeout(() => {
                window.location.href = '/orderSuccess';
              }, 500);
            }
              // console.log(res, 'paymentId')
             catch (error) {
              console.error("Error processing payment: ", error);
            }
          },
        };
        
        var pay = new window.Razorpay(options);
        pay.open();
      } catch (error) {
        console.error("Payment failed", error);
      }
    }
  };
  // console.log(typeof Delivery, Delivery);

  return (
    <div className="lg:p-10 p-5">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 ">
        <div className="bg-gradient-to-r border border-red border-opacity-60 sm:h-fit bg-white sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
        <h2 className="text-2xl font-bold text-red mt-6 ml-3">Your Order</h2>
          <div className="px-4 py-8 sm:overflow-auto  space-y-4">
            {cart?.carts?.map((cart, index) => (
              <div className="flex items-start gap-4 border-b-2 rounded-md border-red border-opacity-60" key={index}>
                <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-2 bg3 mb-2 shrink-0 bg-white rounded-md">
                  <img src={`${baseUrl}${cart.product?.ProductImage?.[0]?.url}`} className="w-full object-cover" />
                </div>
                <div className="w-full overflow-hidden">
                  <h3 className="text-base text-blackfont-bold uppercase truncate">{cart?.product?.ProductName}</h3>
                  <ul className="text-xs text-black space-y-2 mt-2">
                    <li className="flex flex-wrap text-lg gap-4">Quantity <span className="ml-auto text-black">{cart?.Quantity}</span></li>
                    {cart?.product?.Offer ? (
                      <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto text-black">&#8377; {Number((cart?.product?.Price - ((cart.product?.Offer/100) * cart.product?.Price)))*(cart?.Quantity)}</span></li>
                      ):(
                        <li className="flex flex-wrap text-lg gap-4">Total Price <span className="ml-auto text-black">&#8377; {Number(cart?.product?.Price)*(cart?.Quantity)}</span></li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className=" w-full p-4">
            <h4 className="flex flex-wrap gap-4 text-base text-gray ">Total <span className="ml-auto ">&#8377; {totalAmount?.toFixed(2)}</span></h4>
            {/* <h4 className="flex flex-wrap gap-4 text-base text-red">GST ({GST}%) <span className="ml-auto ">+ &#8377; {((GST/100)*totalAmount)?.toFixed(2)}</span></h4> */}
            <h4 className="flex flex-wrap gap-4   pt-3 text-gray font-bold">Choose a State to know your delivery fee:</h4>
            <div className="flex flex-row gap-4 justify-center items-center text-gray ">
              <span className='flex md:flex-row  md:items-center flex-col md:gap-2'>
              Delivery Fee
              <div className='flex items-center gap-1' >
                <select
                  value={state}
                  onChange={handleStateChange}
                  className="px-2 py-1 my-2 bg-red bg-opacity-60 capitalize flex text-white  text-sm rounded-md focus:outline-black"
                >
                  <option className='w-fit' value="" disabled>Choose a state</option>
                  {indianStates.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
             

                {/* <button className='bg-red text-white px-2 py-0.5 rounded'>GET</button> */}

                </div>
              </span>
                  {state ? <span className="ml-auto "> + &#8377; {(Number(Delivery) || 0).toFixed(2)} </span> :  <span className="ml-auto flex justify-center text-justify h-12 font-bold uppercase text-[12px] "> </span>}
              </div>
            <hr className='border-gray'/>
            <h4 className="flex flex-wrap items-center text-xl mt-2 gap-4 font-extrabold text-gray">Grand Total  <span className="ml-auto text-black  font-extrabold ">&#8377; { (totalAmount + Number(Delivery)).toFixed(2)}</span> </h4>
          </div>
        </div>

        <div className="max-w-4xl w-full bg-red bg-opacity-60 h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-red">Complete your order</h2>
          <form className="mt-8" >
            <div>
              <h3 className="text-base text-gray mb-4">Personal Details <span className='text-[#F72C5B] text-lg'>*</span></h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.firstName && <p className="text-gray text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.lastName && <p className="text-gray  text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.email && <p className="text-gray  text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input type="tel" placeholder="Phone No." value={phone} onChange={(e) => setPhone(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.phone && <p className="text-gray  text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base text-gray  mb-4">Shipping Address <span className='text-[#F72C5B] text-lg'>*</span></h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Address Line" value={address} onChange={(e) => setAddress(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.address && <p className="text-gray  text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.city && <p className="text-gray  text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <input type="number" placeholder="Pin Code" value={zip} onChange={(e) => setZip(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                  {errors.zip && <p className="text-gray  text-xs mt-1">{errors.zip}</p>}
                </div>

                <div>
                  <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black" />
                </div>

                <div>
                <select
                  value={state}
                  onChange={handleStateChange}
                  className="px-4 py-3 bg-white text-black w-full text-sm rounded-md focus:outline-black"
                >
                  <option value="" disabled>Select a state</option>
                  {indianStates.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                {errors.state && <></>}
                </div>

              </div>
            </div>


            <div className='mt-8'>
            <h3 className="text-base text-black mb-4">Order Notes If Any (Optional)</h3>
            <textarea className='bg-white p-2 text-black w-full' rows="4" value={notes} placeholder="ex: Can I get this idol in Gold material" onChange={(e) => setNotes(e.target.value)}>
            </textarea>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 mt-8 text-sm text-white">
         <div className='bg-yellow text-black font-bold rounded-lg p-5'>
         <p>For orders to be delivered outside of India, please contact us directly.</p>
         </div>
         <div className='bg-yellow text-black font-bold rounded-lg p-5'>
          <p>By clicking the "Pay Now" button, you agree to our <a href="#" className="text-blue">Terms & Conditions</a> and <a href="#" className="text-blue">Privacy Policy</a> </p>
         </div>
        </div>
            <button type="button" onClick={handlePayment} className="mt-6 w-full bg-white text-gray font-semibold rounded-md px-6 py-3">
              <LockClosedIcon className="h-5 w-5 text-gray inline-block" aria-hidden="true" />
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
