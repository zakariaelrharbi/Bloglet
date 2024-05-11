import { Navbar, TextInput, Button, NavbarToggle } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from 'react-icons/fa';


export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='lg:px-8 mr-14 font-Roboto font-bold text-l sm:text-xl dark:text-white'>
        BloGlet 
      </Link>
      <div className="flex md:order-2">
        <Button className='w-12 h-10 hidden sm:inline mr-4' color='gray' pill>
           <FaMoon/>
        </Button>
        <Link to='/sign-in' className='hidden lg:inline mr-8'>
          <Button color='purple'>Sign In</Button>
       </Link>
        <Navbar.Toggle className='absolute top-0 right-0'/>
      </div>
      <Navbar.Collapse >
        <Navbar.Link active={path === "/"}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"}><Link to='/about'>About</Link></Navbar.Link>
        <Navbar.Link active={path === "/projects"}><Link to='/projects'>Projects</Link></Navbar.Link>
        <Navbar.Link active={path === "/contact"}><Link to='/contact'>Contact</Link></Navbar.Link>        
      </Navbar.Collapse>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
        {/* <Button className='w-12 h-10 lg:hidden mr-3' color='gray' pill>
          <AiOutlineSearch />
        </Button> */}
        </form>
    </Navbar>
  )
}
