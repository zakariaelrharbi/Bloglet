import React, { useState } from 'react';
import { FaUserAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
    if (!data.username) {
      errors.username = "Username is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    } 
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(data.password)) {
      errors.password = "Password must contain at least one uppercase [A-Z] letter";
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
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/signup', {
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
          navigate('/sign-in');
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
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">
              Create Your Account
            </h4>
            <p className="text-[13px] text-white mt-2">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">
              Simple & Secure Registration
            </h4>
            <p className="text-[13px] text-white mt-2">
              Our registration process is designed to be straightforward and secure.
              We prioritize your privacy and data security.
            </p>
          </div>
        </div>
        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="text-sm mb-2 block">Username</label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  className={`bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none ${errors.username ? 'border-red-500' : ''}`}
                  placeholder="Enter username"
                />
                <FaUserAlt className="w-4 h-4 absolute right-4 opacity-60" />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div>
              <label className="text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className={`bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="example@gmail.com"
                />
                <MdOutlineMail className="w-5 h-5 absolute right-4 opacity-60" />
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
                  className={`bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring-1 ${errors.password ? 'border-red-500' : ''}`}
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
          </div>
          <div className="!mt-10">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Create an account
            </button>
          </div>
          <p className="text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to='/sign-in' className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
