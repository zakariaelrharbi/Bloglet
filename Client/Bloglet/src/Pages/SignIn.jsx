import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom' 





export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="font-[sans-serif] text-gray-800 bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
  <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
    <form className="md:col-span-2 w-full py-6 px-6 sm:px-16">
      <div className="mb-8">
        <h3 className="text-4xl font-extrabold">Sign In</h3>
        <p className="text-sm mt-6">
          Welcome back! Please log in to access your account and explore a world
          of possibilities. Your journey begins here.
        </p>
      </div>
      <div className='mb-4'>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                      }
                    })}
                    className="bg-white border border-gray-300 w-full text-sm px-4 py-2.5 mb-1 rounded-md focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none"
                    placeholder="example@gmail.com"
                  />
                  <MdOutlineMail className="w-5 h-5 absolute right-4 top-2.5 opacity-60 " />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mb-4 block">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    {...register("password", {
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      required: "Password is required",
                    })}
                    type={showPassword ? 'text' : 'password'}
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
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 block">{errors.password.message}</p>
                )}
              </div>
      <div className="flex items-center justify-between gap-2 mt-6">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm">
            Remember me
          </label>
        </div>
        <div>
          <a
            href="javascript:void(0);"
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="button"
          className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
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
          Enable the "Remember Me" option for a seamless login experience in
          future sessions.
        </p>
      </div>
      <div>
        <h4 className="text-white text-lg font-semibold">Forgot Password?</h4>
        <p className="text-[13px] text-white mt-2">
          Easily recover your account by clicking on the "Forgot Password?"
          link.
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
