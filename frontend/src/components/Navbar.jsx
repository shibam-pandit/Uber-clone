import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/home');

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setMobileMenuOpen(false); // Close the menu after selection
  };

  const linkStyle = (path) =>
    activeLink === path
      ? 'text-white bg-blue-800 px-4 py-2 rounded-lg font-semibold'
      : 'text-gray-900 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-lg font-semibold';

  return (
    <nav className="top-0 z-30 w-full bg-[#dfa674] shadow-lg py-1">
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12 max-h-16">
        <Link to="/" className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/303453/uber-12-logo.svg"
            alt="Uber Logo"
            className="h-14 object-cover left-3"
          />
        </Link>
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
            <div className="absolute right-0 top-full w-auto min-w-[110px] bg-[#dfa674] bg-opacity-70 border border-black shadow-lg">
              <ul className="flex flex-col divide-y divide-black">
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
                    to="/company"
                    onClick={() => handleLinkClick('/company')}
                    className={`${linkStyle('/company')} block`}
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketplace"
                    onClick={() => handleLinkClick('/marketplace')}
                    className={`${linkStyle('/marketplace')} block`}
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    onClick={() => handleLinkClick('/features')}
                    className={`${linkStyle('/features')} block`}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => handleLinkClick('/contact')}
                    className={`${linkStyle('/contact')} block`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    onClick={() => handleLinkClick('/logout')}
                    className={`${linkStyle('/logout')} block text-red-600 font-semibold hover:bg-red-600`}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="hidden lg:flex lg:w-auto items-center justify-between"
          id="desktop-menu"
        >
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
                to="/company"
                onClick={() => handleLinkClick('/company')}
                className={linkStyle('/company')}
              >
                Company
              </Link>
            </li>
            <li>
              <Link
                to="/marketplace"
                onClick={() => handleLinkClick('/marketplace')}
                className={linkStyle('/marketplace')}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                onClick={() => handleLinkClick('/features')}
                className={linkStyle('/features')}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => handleLinkClick('/contact')}
                className={linkStyle('/contact')}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                onClick={() => handleLinkClick('/logout')}
                className={`${linkStyle('/logout')} text-red-600 font-semibold hover:bg-red-600`}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
