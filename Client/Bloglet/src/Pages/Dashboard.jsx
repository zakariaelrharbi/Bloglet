import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

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
      <h1>dashboard</h1>
    </div>
  )
}
