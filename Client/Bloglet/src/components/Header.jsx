import { Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import {Link} from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='px-2 self-center font-Roboto font-bold text-l sm:text-xl dark:text-white'>
          BloGlet
        </Link>
        <form>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch} 
          />
        </form>
    </Navbar>
  )
}
