import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import CreatePosts from './CreatePosts'

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab('profile'); // Set a default tab if none is specified
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Side bar */}
      <div className='md:w-56'>
        <DashSideBar />
      </div>
      {/* Main Content */}
      <div className='w-full'>
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'createPost' && <CreatePosts />}
      </div>
    </div>
  );
}
