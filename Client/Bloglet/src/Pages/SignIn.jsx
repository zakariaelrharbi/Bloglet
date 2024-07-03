import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));

    // Clear specific error when input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    const errors = {};
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const dataRes = await response.json();

      if (dataRes.success) {
        toast.success(dataRes.message);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(dataRes.message);
        if (dataRes.field) {
          setErrors({ [dataRes.field]: dataRes.message });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="font-[sans-serif] text-gray-800 bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-4xl font-extrabold">Sign In</h3>
            <p className="text-sm mt-6">
              Welcome back! Please log in to access your account and explore a world of possibilities. Your journey begins here.
            </p>
          </div>
          <div className='mb-4'>
            <label className="text-sm mb-2 block">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 mb-1 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none"
                placeholder="example@gmail.com"
              />
              <MdOutlineMail className="w-5 h-5 absolute right-4 top-2.5 opacity-60 " />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                value={data.password}
                type={showPassword ? 'text' : 'password'}
                onChange={handleOnChange}
                className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none"
                placeholder="Enter password"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="w-4 h-4 absolute right-4 cursor-pointer opacity-60"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaRegEye
                  className="w-4 h-4 absolute right-4 cursor-pointer opacity-60"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-0 focus:outline-none focus:shadow-none focus:border-gray-400 focus:ring-offset-0 border-gray-400 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm">
                Remember me 
              </label>
            </div>
            <div>
              <a
                href="#"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </div>
          <p className="text-sm mt-10 text-center">
            Don't have an account{" "}
            <Link to="/Sign-Up"
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Register here
            </Link>
          </p>
        </form>
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">
              Secure Authentication
            </h4>
            <p className="text-[13px] text-white mt-2">
              Log in with your registered email and password securely.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Remember Me</h4>
            <p className="text-[13px] text-white mt-2">
              Enable the "Remember Me" option for a seamless login experience in future sessions.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Forgot Password?</h4>
            <p className="text-[13px] text-white mt-2">
              Easily recover your account by clicking on the "Forgot Password?" link.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
