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
  }, [location])
  return (
    <div>
      {/* Side bar */}
      <div>
        <DashSideBar />
      </div>
      {/* Profile */}
      <div>
        {tab === 'profile' && (<DashProfile />)}
      </div>
    </div>
  )
}
