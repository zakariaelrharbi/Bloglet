import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import Projects from './Pages/Projects';
import Header from './components/Header';
import Contact from './Pages/Contact';
import Footer from './components/Footer';
import CreatePost from './Pages/CreatePosts';
import UpdatePost from './Pages/UpdatePost';
import { Toaster } from 'sonner';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';


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
        <Route path='/projects' element={<Projects />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route> 
      </Routes>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

export default AppWrapper;
