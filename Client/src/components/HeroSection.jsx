import React from 'react'
import { Link } from 'react-router-dom'
import Img1 from '../assets/img1.jpg'

const HeroSection = () => {
  return (
    <div>
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <img
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75"
        height={1080}
        src={Img1}
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className="relative z-10 max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-100 dark:text-gray-50 sm:text-5xl lg:text-5xl">
          Welcome to our Blog
        </h1>
        <p className="mt-3 text-xl text-gray-100 dark:text-gray-400 sm:mt-5 sm:text-2xl lg:text-2xl">
          Discover the latest news and insights from our team.
        </p>
        <div className="mt-10 sm:mt-12">
          <Link
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-50"
            href="#"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
    </div>
  )
}

export default HeroSection
