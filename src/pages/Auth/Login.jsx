import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginSuccess } from '../../Slice/authSlice';
import { loginUser, registerUser, resendOtp, verifyOtp } from '../../Slice/authThunk';
import { setCartItems } from '../../Slice/cartSlice';
import api from '../../Utils/api'
import { TextField, Typography } from '@mui/material';

import './style.css'
const LoginUserId = localStorage.getItem('LoginUserId');
const LoginEmail = localStorage.getItem('UserEmail');
const RegUserId = localStorage.getItem('RegUserId');
const RegName = localStorage.getItem('RegName');
const RegEmail = localStorage.getItem('RegEmail');
const RegNumber = localStorage.getItem('RegNumber');
let RegConfirmed = localStorage.getItem('RegConfirmed')==="true";
let UserId;
let EmailId;

if(LoginUserId){
  UserId = LoginUserId;
}else if(RegUserId){
  UserId = RegUserId;
}else{
  UserId = null;
}

if(RegEmail){
  EmailId = RegEmail;
}else if(LoginEmail){
  EmailId = LoginEmail;
}else{
  EmailId = null;
}

const useRegisterQuery = () => {
  return useMutation(
    async (registerData) => {
      const res = await api.post('/api/auth/local/register', registerData);
      return res.data;
    });
}





const Login = ({ setIsOpen, modalIsOpen }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerMobile, setRegisterMobile] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // Timer countdown (30 seconds)
  const [isDisabled, setIsDisabled] = useState(false);
  const [Error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false)
  const [mailSent, setMailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const useLoginQuery = () => useMutation(
    async (loginData) => {
      const res = await api.post('/api/auth/local', loginData);
      return res.data;
    },
    {
      onSuccess: (data) => {
        const { jwt, user } = data;
        localStorage.setItem('JwtToken', jwt);
        dispatch(loginSuccess({ token: jwt, user })); // Set auth data in Redux
        // Fetch user cart after login
        fetchCartData(user.id);
      },
    }
  );

  const fetchCartData = async (userId) => {
    try {
      // Fetch the user's cart from Strapi backend (ensure the API endpoint and structure are correct)
      const { data } = await api.get(`/api/users/33?populate=cart`);
      // console.log('33 users cart fetched',data);
      // Assuming the cart data is in 'cart' field in response
      dispatch(setCartItems(data?.cart || [])); // Set cart items in Redux
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  };


  const {data:auth} = useQuery("Auth", async ()=>{
    const res = await api.get(`/api/users/${LoginUserId}`)
    return res.data;
  },{enabled:!UserId})
  // console.log(auth,'AUth Details')

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      margin: 'auto',
      zIndex: 50,
    },
  };
  const useOtpQuery = () => {
    return useMutation(
      async (otpData) => {
        const res = await api.post('/api/auth/verifyOTP', otpData);
        setOtpMessage(res.data.message);
        // console.log(res)
        return res.data;
      });
  }
  const SentOtp = otpMessage;

  const {mutate:mutateRegister} = useRegisterQuery();
  const {mutate:mutateLogin } = useLoginQuery();
  const {mutate:mutateOtp } = useOtpQuery();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      try {
        await dispatch(loginUser({ identifier: loginEmail, password: loginPassword })).unwrap();
        setIsOpen(false);
        localStorage.setItem('LoginConfirmed', true);
        toast.success('Logged in successfully');
        window.location.reload();
      } catch (error) {
        toast.error('Login failed. Please try again.');
        setTimeout(setError,3000);
        setError('Login failed. Please try again.');
      }
    } else {
      toast.error('Invalid credentials');
      setTimeout(setError,3000);
      setError('Invalid credentials');
    }
  };

    // Timer effect
    useEffect(() => {
      if (isOtpSent || !RegConfirmed && timeLeft > 0) {
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
      }
    }, [timeLeft, isOtpSent,RegEmail]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerMobile && registerEmail && registerPassword && registerName) {
      setIsDisabled(true);
      setResendLoading(true);
      try {
        await dispatch(registerUser({
          PhoneNumber: registerMobile,
          email: registerEmail,
          password: registerPassword,
          username: registerName
        })).unwrap();
        toast.success('OTP has been sent to you.');
        setIsOtpSent(true);
        setResendLoading(false);
      } catch (error) {
        setError("Registration failed. Please try again");
        setTimeout(setError,3000);
        toast.error('Registration failed. Please try again');
      }
    } else {
      setError("Please fill in all fields");
      setTimeout(setError,3000);
      toast.error('Please fill in all fields');
    }
  };

  const handleVerifyOtp = async () => {

    let Email;
      if( registerEmail){
        Email = registerEmail;
        }else if(RegEmail){
          Email = RegEmail;
        }
    try {
      await dispatch(verifyOtp({
          emailId: Email,
          otp: otp,
      })).unwrap();
      toast.success("OTP Verification Successful");
      localStorage.setItem('userConfirmed', true);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      setError("Invalid / Expired OTP.");
      setTimeout(setError,3000);
      toast.error("Invalid / Expired OTP.");
    }
  };
  const userConfirmed = localStorage.getItem('userConfirmed')==="true";
  // console.log(userConfirmed,'userConfirmed')

  const handleResendOtp = async () => {
    setResendLoading(true);
    let Email;
    if( registerEmail){
      Email = registerEmail;
      }else if(RegEmail){
        Email = RegEmail;
      }
    try {
      await dispatch(resendOtp(
        {emailId: Email,name:RegName }
        )).unwrap();
        setTimeout(()=>{
          setIsDisabled(true);
        },1000)
        setIsDisabled(false);
      toast.success("New OTP has been sent.");
      setResendLoading(false);
      setTimeLeft(30); // Reset the timer
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      setTimeout(setError,3000);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };


  const handleForgotPassword = async() => {
    // alert('Password reset link has been sent to your email');
    // console.log(loginEmail,'loginEmail')
    if(loginEmail){
      setMailSent(true);
      try {
        const res = await api.post(`api/auth/forgot-password`,{
          email:loginEmail
        })
        // console.log(res,'Forget password reset')
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
    else{
      setError('Please enter your registered email address and click forget password');
    }
    // closeModal();
  };



  return (
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Login Modal"
      overlayClassName="fixed inset-0 bg-gray bg-opacity-80 z-[9999]"
      ariaHideApp={false}
    >
      {!isLogin ? (
   <div className="bg-white shadow-2xl flex flex-col items-center w-full max-w-[90%] sm:max-w-[400px] lg:w-[350px] mx-auto p-6 rounded-md">
  
   <form onSubmit={handleLogin} className="flex flex-col w-[225px]  gap-4">
     <h2 className="text-2xl text-red uppercase text-center font-bold">Login</h2>
     
     {/* Input Fields */}
     <div className="flex flex-col gap-2">
       <input
         type="email"
         className="rounded-md px-3 py-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
         placeholder="Email Address"
         value={loginEmail}
         onChange={(e) => setLoginEmail(e.target.value)}
         autoComplete="email"
       />
       <input
         type={showPassword ? "text" : "password"}
         className="rounded-md px-3 py-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
         placeholder="Password"
         value={loginPassword}
         onChange={(e) => setLoginPassword(e.target.value)}
         autoComplete="current-password"
       />
     </div>
 
     {/* Show Password Checkbox */}
     <div className="flex justify-between items-center text-sm">
       <div className="flex items-center">
         <input
           type="checkbox"
           id="showPassword"
           checked={showPassword}
           onChange={() => setShowPassword(!showPassword)}
           className="mr-1"
         />
         <label htmlFor="showPassword">Show Password</label>
       </div>
       <p className="text-black font-bold cursor-pointer hover:underline" onClick={handleForgotPassword}>
         Forgot Password?
       </p>
     </div>
 
     {/* Error Messages */}
     {Error && <p className="text-red-500 font-bold uppercase text-center animate-pulse">{Error}</p>}
     {mailSent && <p className="text-red font-bold text-center uppercase animate-pulse">Password reset link sent!</p>}
 
     {/* Buttons */}
     <div className="flex flex-col gap-2">
       <button
         type="submit"
         className="w-full bg-red text-white py-2 rounded-md font-bold uppercase shadow-md hover:bg-opacity-90 transition"
       >
         Login
       </button>
       <button
         type="button"
         className="w-full bg-gray-200 text-black py-2 text-sm rounded-md shadow-md hover:bg-white transition"
         onClick={() => setIsLogin(true)}
       >
         Don't have an account? <span className="text-red hover:underline">Register</span>
       </button>
     </div>
   </form>
 </div>
 
      
      ) : (
        <div className="bg-white shadow-2xl flex flex-col items-center w-full max-w-[90%] lg:w-[400px] mx-auto p-6 rounded-md">
  
        {!userConfirmed ? (
          <form className="flex flex-col w-[225px]  gap-4">
            <h2 className="text-2xl text-red uppercase text-center font-bold">Signup</h2>
            
            {/* Input Fields */}
            {!RegEmail && (
              <>
                <input
                  type="text"
                  className="rounded-md px-3 py-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
                  placeholder="Your Name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="rounded-md px-3 py-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
                  placeholder="Email Address"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  className="rounded-md px-3 py-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
                  placeholder="Phone Number"
                  value={registerMobile}
                  onChange={(e) => setRegisterMobile(e.target.value)}
                  minLength={10}
                  maxLength={10}
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="rounded-md px-3 py-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
                  placeholder="Password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </>
            )}
      
            {/* Show Password Checkbox */}
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-1"
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
      
            {/* OTP Section */}
            {isOtpSent || RegEmail ? (
              <>
                <input
                  type="text"
                  className="rounded-md p-2 w-full border border-black bg-white focus:border-red focus:outline-none focus:shadow-md"
                  placeholder="Enter OTP"
                  value={otp}
                  maxLength={6}
                  minLength={6}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {Error && <p className="text-center text-red-500 font-bold animate-pulse">{Error}</p>}
                
                <p className="text-center text-yellow-500">
                  {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : (
                    <span className="cursor-pointer hover:underline" onClick={handleResendOtp}>
                      {resendLoading ? "Resending..." : "Resend OTP"}
                    </span>
                  )}
                </p>
      
                <button
                  type="button"
                  className="w-full bg-red text-white py-2 rounded-md font-bold uppercase shadow-md hover:bg-opacity-90 transition"
                  onClick={handleVerifyOtp}
                  disabled={otp.length < 6}
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <>
                {Error && <p className="text-center text-red-500 font-bold animate-pulse">{Error}</p>}
      
                <button
                  type="submit"
                  className="w-full bg-red text-white py-2 rounded-md font-bold uppercase shadow-md hover:bg-opacity-90 transition"
                  onClick={handleRegister}
                  disabled={isDisabled}
                >
                  {resendLoading ? "Processing..." : "Register"}
                </button>
              </>
            )}
      
            {/* Already Have an Account */}
            <p className="text-center text-black text-sm">
              Already have an account?{" "}
              <span className="text-red font-bold cursor-pointer hover:underline" onClick={() => setIsLogin(false)}>
                Login
              </span>
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl text-black uppercase font-bold">User Already Registered</h2>
            <button
              type="button"
              className="w-full bg-red text-white py-2 rounded-md font-bold uppercase shadow-md hover:bg-opacity-90 transition mt-4"
              onClick={() => setIsLogin(false)}
            >
              Click here to Log in
            </button>
          </div>
        )}
      </div>
      
      )}
    </Modal>
  );
};

export default Login;
