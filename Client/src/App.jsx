import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./layouts/Header";
import Contact from "./pages/Contact";
import Footer from "./layouts/Footer";
import CreatePost from './pages/CreatePosts.jsx';
import UpdatePost from "./pages/UpdatePost";
import { Toaster } from "sonner";
import PrivateRoute from "./features/auth/components/PrivateRoute";
import ScrollToTop from "./layouts/ScrollToTop";

const App = () => {
  const location = useLocation();

  const showHeaderFooter = !["/sign-in", "/sign-up"].includes(
    location.pathname.toLowerCase(),
  );

  return (
    <div>
      <Toaster richColors position="top-center" />
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
