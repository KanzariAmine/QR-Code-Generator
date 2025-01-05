import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/kanpower_logo.jpg";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-[50%]"
                src={logo} // Replace with your logo image path
                alt="Logo"
              />
            </div>
            {/* Nav Links */}
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Home
              </NavLink>
              <NavLink
                to="/generate_qr_code"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Generate QR Code
              </NavLink>
              <NavLink
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                onClick={logout}
              >
                Logout
              </NavLink>
              {/* Additional Links can be added here */}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
                />
              </svg>
            </button>
            {/* Profile Image (Optional) */}
            {/* <div>
              <img
                className="h-8 w-8 rounded-full"
                src="profile.jpg" // Replace with your profile image path
                alt="Profile"
              />
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
