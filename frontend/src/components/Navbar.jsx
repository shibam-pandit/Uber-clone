import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(props.currentPath);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setMobileMenuOpen(false); // Close the menu after selection
  };

  const linkStyle = (path) =>
    activeLink === path
      ? 'text-white bg-blue-900 px-4 py-2 rounded-lg font-semibold'
      : 'text-gray-900 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg font-semibold';

  return (
    <nav className="top-0 z-30 w-full bg-[#dfa674] shadow-lg py-1">
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12 max-h-16">
        {/* Logo - Left side */}
        <Link to="/" className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/303453/uber-12-logo.svg"
            alt="Uber Logo"
            className="h-14 object-cover left-3"
          />
        </Link>

        {/* Mobile menu button */}
        <div className="relative lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="p-2 text-black border border-black rounded-lg focus:outline-none"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          {isMobileMenuOpen && (
            <div className="absolute right-0 top-full w-auto min-w-[110px] bg-[#dfa674] bg-opacity-70 border border-black shadow-lg" style={{ zIndex: 50 }}>
              <ul className="flex flex-col divide-y divide-black z-20">
                <li>
                  <Link
                    to="/home"
                    onClick={() => handleLinkClick('/home')}
                    className={`${linkStyle('/home')} block`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about?requestFrom=home"
                    onClick={() => handleLinkClick('/about')}
                    className={`${linkStyle('/about')} block`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact?requestFrom=home"
                    onClick={() => handleLinkClick('/contact')}
                    className={`${linkStyle('/contact')} block`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => handleLinkClick('/profile')}
                    className={`${linkStyle('/profile')} block`}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Desktop Menu - Middle and Right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-between items-center">
          {/* Center navigation links */}
          <div className="flex-1"></div>
          <div className="flex justify-center flex-1">
            <ul className="flex flex-row space-x-3">
              <li>
                <Link
                  to="/home"
                  onClick={() => handleLinkClick('/home')}
                  className={linkStyle('/home')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about?requestFrom=home"
                  onClick={() => handleLinkClick('/about')}
                  className={linkStyle('/about')}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact?requestFrom=home"
                  onClick={() => handleLinkClick('/contact')}
                  className={linkStyle('/contact')}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Profile icon - Right side */}
          <div className="flex justify-end flex-1">
            <Link
              to="/profile"
              onClick={() => handleLinkClick('/profile')}
              className={`p-2 rounded-full ${activeLink === '/profile' ? 'bg-blue-900 text-white' : 'text-gray-900 hover:bg-blue-400 hover:text-white'}`}
              title="Profile"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
