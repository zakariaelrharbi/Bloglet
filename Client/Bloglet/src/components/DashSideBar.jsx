import React, {useState, useEffect} from 'react'
import {Sidebar} from 'flowbite-react';
import { SlUser } from "react-icons/sl";
import { PiSignOutLight } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom'
import { HiDocumentText } from "react-icons/hi2";
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'sonner'; 




const DashSideBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch(); // Accessing the dispatch function from the useDispatch hook

  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  // Function to handle sign out
  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/signout', {
        method: 'POST',
      });
      const dataRes = await res.json();
      if (!res.ok) {
        toast.error(dataRes.message);
      } else {
        toast.success(dataRes.message);
        dispatch(signOutSuccess());
      }
    } catch (error) {
      toast.error('An error occurred. Please try again');
    }
  };


  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='cursor-pointer flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} 
            icon={SlUser}
            label={currentUser.isAdmin ? "Admin" : "User"} 
            labelColor ='dark'
            as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=posts'>
            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} 
            as='div'>
              Posts
            </Sidebar.Item>
          </Link>
          <Sidebar.Item  icon={PiSignOutLight} 
            onClick={handleSignout}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar
