import { Navbar, TextInput, Button } from 'flowbite-react';
import React from 'react';
import {Link} from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from 'react-icons/fa';


export default function Header() {
  return (
    <Navbar className='border-b-2 '>
        <Link to="/" className='px-2 self-center font-Roboto font-bold text-l sm:text-xl dark:text-white'>
          BloGlet
        </Link>
        <form className='flex items-center'>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline '
          />
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
          </Button>
          <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
              <FaMoon/>
            </Button>
            <Link to='/sign-in'>
            <Button  color='purple'>
              Sign In
            </Button>
            </Link>
          </div>
            <Navbar.Collapse className='flex gap-2'>
                <Navbar.Link>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </form>
    </Navbar>
  )
}
