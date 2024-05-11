import { Navbar, TextInput, Button, NavbarToggle } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from 'react-icons/fa';


export default function Header() {
  return (
    // <Navbar className='border-b-2'>
    //   <Link to="/" className='px-2 font-Roboto font-bold text-l sm:text-xl dark:text-white'>
    //     BloGlet
    //   </Link>
    //   <Navbar.Collapse>
    //     <Navbar.Link>
    //       <Link to='/'>
    //         Home
    //       </Link>
    //     </Navbar.Link>
    //     <Navbar.Link>
    //       <Link to='/about'>
    //         About
    //       </Link>
    //     </Navbar.Link>
    //     <Navbar.Link>
    //       <Link to='/projects'>
    //         Projects
    //       </Link>
    //     </Navbar.Link>
    //   </Navbar.Collapse>
    //   <form className='flex items-center'>
    //     <TextInput
    //       type='text'
    //       placeholder='Search...'
    //       rightIcon={AiOutlineSearch}
    //       className='hidden lg:inline mr-4'
    //     />
    //     <Button className='w-12 h-10 lg:hidden mr-3' color='gray' pill>
    //       <AiOutlineSearch />
    //     </Button>
    //     <Button className='w-12 h-10 hidden sm:inline mr-4' color='gray' pill>
    //       <FaMoon/>
    //     </Button>
    //     <Link to='/sign-in'>
    //       <Button  color='purple'>
    //         Sign In
    //       </Button>
    //     </Link>
    //     <Navbar.Toggle />
    //   </form>
    // </Navbar>

    <Navbar className='border-b-2'>
      <Link to="/" className='px-2 font-Roboto font-bold text-l sm:text-xl dark:text-white'>
        BloGlet 
      </Link>
      <div className="flex md:order-2">
        <Link to='/sign-in'>
          <Button color='purple'>Sign In</Button>
       </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link><Link to='/about'>About</Link></Navbar.Link>
        <Navbar.Link><Link to='/projects'>Projects</Link></Navbar.Link>
        <Navbar.Link><Link to='/contact'>Contact</Link></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
