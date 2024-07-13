import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { VscDiffAdded } from "react-icons/vsc";
import { MdAccessTime } from "react-icons/md";
import { PiSignOutFill } from "react-icons/pi";
import { toast } from 'react-toastify';

const DashSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Define navigate

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
        navigate('/sign-in');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again');
    }
  };

  return (
    <div>
        <nav className="bg-[#f7f7f8] h-screen absolute top-0 left-0 min-w-[250px] py-6 xl:py-[110px]  px-4 font-[sans-serif]">
        <div className="overflow-auto h-full">
          <ul className="space-y-1">
          <li>
              <Link
                  to="/dashboard?tab=profile"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <CgProfile className="w-6 h-6 mr-4" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <LuLayoutDashboard className="w-6 h-6 mr-4" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <LuUsers className="w-6 h-6 mr-4" />
                <span>Audience</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <VscDiffAdded className="w-6 h-6 mr-4" />
                <span>Posts</span>
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <MdAccessTime className="w-6 h-6 mr-4" />
                <span>Schedules</span>
              </a>
            </li>
            <li>
            <button
                  onClick={handleSignout}
                  className="w-full text-left text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
                  >
                <PiSignOutFill className="w-6 h-6 mr-4" />
                  <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default DashSideBar;
