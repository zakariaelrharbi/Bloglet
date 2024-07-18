import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'

export default function Dashboard() {
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
    <div className='flex flex-col md:flex-row'>
      {/* Side bar */}
      <div className=''>
        <DashSideBar />
      </div>
      {/* Profile */}
      <div>
        {tab === 'profile' && (<DashProfile />)}
      </div>
    </div>
  )
}
