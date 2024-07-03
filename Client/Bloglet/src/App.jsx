import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Header from './components/Header'
import Contact from './Pages/Contact'
import Footer from './components/Footer'
import { Toaster } from 'sonner'; // Ensure you're using 'sonner' consistently


const App = () => {
  const location = useLocation();
  
  const showHeaderFooter = !['/sign-in', '/sign-up'].includes(location.pathname.toLowerCase());

  return (
    <div>
      <Toaster richColors position="top-center" />
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  )
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
