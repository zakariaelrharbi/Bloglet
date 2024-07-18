import React from 'react'
import {Sidebar} from 'flowbite-react';
import { SlUser } from "react-icons/sl";
import { PiSignOutLight } from "react-icons/pi";



const DashSideBar = () => {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='cursor-pointer'>
          <Sidebar.Item active icon={SlUser} label={"User"} labelColor ='dark'>
            Profile
          </Sidebar.Item>
          <Sidebar.Item active icon={PiSignOutLight} >
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
