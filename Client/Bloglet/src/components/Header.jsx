import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { TextInput } from 'flowbite-react';
import { AiOutlineSearch } from "react-icons/ai";
 
const Header = () => {
const [navIsOpened, setNavIsOpened] = useState(false)
const closeNavbar = () => {
setNavIsOpened(false)
}
const toggleNavbar = () => {
setNavIsOpened(navIsOpened => !navIsOpened)
}
return (
<>
  <div aria-hidden={true} onClick={() => {
    closeNavbar()
  }} className={
    `fixed bg-gray-800/40 inset-0 z-30 ${navIsOpened ? "lg:hidden" : "hidden lg:hidden"}`
  } />
  <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-gray-600 dark:border-b-gray-900 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl">
    <nav className="relative mx-auto lg:max-w-9xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
      <div className="flex items-center min-w-max">
       <Link to="/" className='lg:px-8 mr-14 font-Roboto font-bold text-2xl lg:text-2xl dark:text-white'>
         BloGlet 
      </Link>
      </div>
      <div className={`
        absolute top-full left-0 bg-white dark:bg-gray-950 lg:bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6
        ${navIsOpened ? "visible opacity-100 translate-y-0" : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"}
        `}>
        <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
          <li>
            <Link to={'/'} className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <Link to={'about'} className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600">
              About
            </Link>
          </li>
          <li>
            <Link to={'/projects'} className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600">
              Projects
            </Link>
          </li>
          <li>
            <Link to={'/contact'} className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600">
              Contact
            </Link>
          </li>
        </ul>
          <div className='lg:flex lg:gap-4 lg:items-center'>
             <form className='flex items-center '>
               <TextInput
                 type='text'
                 placeholder='Search...'
                 rightIcon={AiOutlineSearch}
                 className='lg:inline'
               />
             </form>
          </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4  lg:min-w-max mt-10 lg:mt-0">
          <Link to='/sign-in' className="relative flex justify-center px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition before:bg-gray-100 dark:before:bg-gray-900 text-indigo-600 dark:text-white hover:before:scale-105">
            <span className="relative">
              Sign In
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center lg:hidden">
        <button onClick={() => {
          toggleNavbar()
        }} aria-label='toggle navbar' className="outline-none border-l border-l-indigo-100 dark:border-l-gray-800 pl-3 relative py-3">
          <span aria-hidden={true} className={`
            flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
            ${navIsOpened ? "rotate-45 translate-y-[.324rem]" : ""}
          `}>
          </span>
          <span aria-hidden={true} className={`
            mt-2 flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
            ${navIsOpened ? "-rotate-45 -translate-y-[.324rem]" : ""}
            `} />
        </button>
      </div>
    </nav>
  </header>
</>
)
} 
export default Header


