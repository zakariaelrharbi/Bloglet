import React, { useState } from 'react';
import { FaUserAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useForm } from 'react-hook-form';




export default function SignUp() {
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
        mode: "onChange",
    });

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <>
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
          Simple &amp; Secure Registration
        </h4>
        <p className="text-[13px] text-white mt-2">
          Our registration process is designed to be straightforward and secure.
          We prioritize your privacy and data security.
        </p>
      </div>
    </div>
    <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Create an account</h3>
      </div>
      <div className="space-y-5">
        <div>
          <label className="text-sm mb-2 block">username</label>
          <div className="relative flex items-center">
            <input
              name="username"
              type="text"
              {...register("username",{
                    minLength: {
                        value: 3,
                        message: "username must be at least 3 character",
                    },
                    required:{
                        value: true,
                        message: "username is required"
                    }
                })}
              className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500"
              placeholder="Enter username"
            />
            <FaUserAlt className="w-4 h-4 absolute right-4 opacity-60" />
          </div>
            {errors.username?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.username?.message}</p>
              )}
        </div>
        <div>
          <label className="text-sm mb-2 block">Email</label>
          <div className="relative flex items-center">
            <input
              name="email"
              type="email"
              {...register("email", {
                   required:{
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                    }
                })}
              className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500"
              placeholder="example@gmail.com"
            />
            <MdOutlineMail className="w-5 h-5 absolute right-4 opacity-60" />
          </div>
           {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.email?.message}</p>
            )}
        </div>
        <div>
          <label className="text-sm mb-2 block">Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              {...register("password",{
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 character",
                    },
                    required:{
                        value: true,
                        message: "Password is required"
                    },
                })}
              className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md focus:border-cyan-500 focus:ring-cyan-500"
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
          {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1 block text-left">{errors.password?.message}</p>
            )}
        </div>
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm">
            I accept the{" "}
            <a
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      <div className="!mt-10">
        <button
          type="button"
          disabled = {!isValid || !termsAccepted}
          className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Create an account
        </button>
      </div>
      <p className="text-sm mt-6 text-center">
        Already have an account?{" "}
        <a
          href="javascript:void(0);"
          className="text-blue-600 font-semibold hover:underline ml-1"
        >
          Login here
        </a>
      </p>
    </form>
  </div>
</div>

</>
  )
}
