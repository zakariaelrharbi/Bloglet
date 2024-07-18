import React, {useState, useEffect} from 'react'
import {Sidebar} from 'flowbite-react';
import { SlUser } from "react-icons/sl";
import { PiSignOutLight } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom'





const DashSideBar = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='cursor-pointer'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={SlUser} label={"User"} labelColor ='dark'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item  icon={PiSignOutLight} >
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
