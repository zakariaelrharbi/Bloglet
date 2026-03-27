import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { signOutSuccess } from "../redux/user/userSlice";
import { signOut } from "../api/authApi";
import { toast } from "sonner";
import { toggleDarkMode } from "../redux/theme/themeSlice";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { getImageUrl } from "../utils/imageHelper";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  // Access currentUser from Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const user = currentUser;

  // Function to handle sign out
  const handleSignout = async () => {
    try {
      const { ok, data: dataRes } = await signOut();
      if (!ok) {
        toast.error(dataRes.message);
      } else {
        toast.success(dataRes.message);
        dispatch(signOutSuccess());
      }
    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold font-serif text-brand-navy dark:text-white transition-colors"
            >
              BloGlet<span className="text-brand-amber">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-10 py-1.5 border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber/50 focus:border-brand-amber w-48 transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>

            <button
              onClick={handleToggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
              <div className="hidden lg:flex lg:items-center">
                {!user ? (
                  <Link
                    to="/sign-in"
                    className="px-5 py-2 rounded-full border border-brand-navy dark:border-slate-600 text-brand-navy dark:text-white hover:bg-brand-navy dark:hover:bg-slate-700 hover:text-white transition-colors font-medium text-sm"
                  >
                    Sign In
                  </Link>
                ) : (
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <Avatar
                        alt="user"
                        img={getImageUrl(user.profilePicture)}
                        rounded
                        className="w-8 h-8"
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="block text-sm">@{user.username}</span>
                      <span className="block text-xs font-medium truncate">
                        {user.email}
                      </span>
                    </Dropdown.Header>
                    <Link to="/dashboard?tab=profile" className="block text-sm">
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={handleToggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-3 shadow-lg transition-colors duration-300">
          <div className="px-3 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber/50"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          <div className="px-3 py-2">
            <Link
              to="/sign-in"
              className="block w-full text-center px-5 py-2 rounded-lg bg-brand-navy dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
