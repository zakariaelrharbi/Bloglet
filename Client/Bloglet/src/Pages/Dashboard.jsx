import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar'

export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    console.log(tabFromUrl)
  }, [location])
  return (
    <div>
      {/* Side bar */}
      <div>
        <DashSideBar />
      </div>
      {/* Main content */}
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
      </div>
    </div>
  )
}
