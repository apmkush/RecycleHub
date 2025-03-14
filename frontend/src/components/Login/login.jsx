import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice.js';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import './../../index.css';

const Login = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isForgotEmail, setIsForgotEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordPage, setIsPasswordPage] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const loginTitleRef = useRef(null);
    const userEmailRef = useRef(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });


    const DisplayMessage = (text) => {
        toast.success(text, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { marginTop: "10px" },
        });
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        let obj = { [name]: value };
        setFormInput((prev) => ({ ...prev, ...obj }));
    };

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                DisplayMessage(response.data.message);

                dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));

            } else {
                DisplayMessage(response.data.message, "error");
            }
            console.log(response.data.message);
        } catch (e) {
            console.log(e);
            DisplayMessage("An error has occurred!", "error");
        }
        setTimeout(() => {
            navigate('/Home');
        }, 2000);
    };
    // useEffect(() => {
    //     if (userId && userType) {
    //         console.log("User ID:", userId);
    //         console.log("User Type:", userType);
    //     }
    // }, [userId, userType]);

    const handleNextClick = (e) => {
        e.preventDefault();

        // Email validation
        if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            DisplayMessage("Please enter a valid email address!", "error");
            return;
        }

        setIsPasswordPage(true);
        setTimeout(() => passwordInputRef.current.focus(), 500);
        loginTitleRef.current.innerHTML = 'Welcome to RecycleHub';
        userEmailRef.current.innerHTML = email;
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        setIsPasswordPage(false);
        loginTitleRef.current.innerHTML = 'Login';
        userEmailRef.current.innerHTML = 'Please login to use RecycleHub';
        setTimeout(() => emailInputRef.current.focus(), 500); // Refocus on the email input
    };

    const handleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        // console.log(token);
        const userDetails = jwtDecode(token);
        console.log(userDetails);
        // Further token handling can be added here if necessary
        const response = await axios.get(`http://localhost:5000/google-login`,
            {
              headers: {
                  Authorization: `${token}`, // Send JWT token in headers
              },
          });
          if(response.data.success){
            console.log(response.data); 
            dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
            DisplayMessage("Login successfully!!");
            setTimeout(() => {
                navigate('/Home');
            }, 2000);
          }else{
            console.log(response.data.message);
          }
    };

    const handleLoginError = () => {
        console.log('Login Failed');
        DisplayMessage("Login Failed!!");
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/send-otp', formInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                DisplayMessage(response.data.message);
            } else {
                DisplayMessage(response.data.message, "error");
            }
            console.log(response.data.message);
        } catch (e) {
            DisplayMessage("An error has occurred!", "error");
        }
        setIsForgotEmail(true);
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { email, otp }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                DisplayMessage(response.data.message);
                setIsOtpVerified(true);
            } else {
                DisplayMessage(response.data.message, "error");
            }
            console.log(response.data.message);
        } catch (e) {
            console.log(e);
            DisplayMessage("An error has occurred!!");
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            DisplayMessage("Passwords do not match!", "error");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/reset-password', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                DisplayMessage(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                DisplayMessage(response.data.message, "error");
            }
            console.log(response.data.message);
        } catch (e) {
            console.log(e);
            DisplayMessage("An error has occurred!!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <form>
                    {/* Forgot Email & OTP Verification */}
                    {isForgotEmail && !isOtpVerified && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Forgot Password</h2>
                            <p className="text-gray-500 text-center mb-6">Enter OTP sent to your email</p>
                            <input
                                type="number"
                                className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(event) => setOtp(event.target.value)}
                                required
                            />
                            <button
                                onClick={verifyOtp}
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Submit OTP
                            </button>
                            <button
                                onClick={() => setIsForgotEmail(false)}
                                className="w-full px-4 py-2 font-semibold text-gray-500 mt-2"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
    
                    {/* Reset Password */}
                    {isOtpVerified && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Reset Password</h2>
                            <input
                                type="password"
                                className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                onClick={handlePasswordReset}
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Reset Password
                            </button>
                        </div>
                    )}
    
                    {/* Login Form */}
                    {!isForgotEmail && !isOtpVerified && (
                        <div className={`transition-all duration-500 ${isPasswordPage ? 'transform scale-105' : ''}`}>
                            <div className="mb-6 text-center">
                                <h2 className="text-2xl font-semibold text-gray-800" ref={loginTitleRef}>Login</h2>
                                <p className="text-gray-500" ref={userEmailRef}>Please login to use RecycleHub</p>
                            </div>
    
                            {/* Email Page */}
                            {!isPasswordPage && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => {setEmail(e.target.value);handleInput(e)}}
                                            ref={emailInputRef}
                                            required
                                        />
                                    </div>
                                    <div className="text-gray-500 text-sm text-center">
                                        <p>Not your computer? Use guest mode to log in privately.</p>
                                        <a href="#" className="text-blue-500 hover:underline">Learn more</a>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Link to="/Signup" className="text-sm text-blue-500 hover:underline">Create account</Link>
                                        <button
                                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                                            onClick={handleNextClick}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
    
                            {/* Password Page */}
                            {isPasswordPage && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full px-4 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your password"
                                            name="password"
                                            onChange={handleInput}
                                            ref={passwordInputRef}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="text-sm text-blue-500 hover:underline"
                                            onClick={sendOtp}
                                        >
                                            Forgot password?
                                        </button>
                                        <label className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={showPassword}
                                                onChange={toggleShowPassword}
                                            />
                                            Show password
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="px-4 py-2 font-semibold text-white bg-gray-400 rounded hover:bg-gray-500"
                                            onClick={handleBackClick}
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            )}
    
                            <GoogleOAuthProvider clientId="35549278582-op72jge9avqf17n7uohv38a1lq9jbse1.apps.googleusercontent.com">
                                <div className="App">
                                    <h2>Login with Google</h2>
                                    <GoogleLogin
                                        onSuccess={handleLoginSuccess}
                                        onError={handleLoginError}
                                        useOneTap
                                    />
                                    {/* <button onClick={() => googleLogout()}>Logout</button> */}
                                </div>
                            </GoogleOAuthProvider>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
    

}

export default Login;
