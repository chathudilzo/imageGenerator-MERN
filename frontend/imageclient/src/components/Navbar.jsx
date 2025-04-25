import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useUser } from "../providers/UserProvider";
import LoginRegisterPopup from "../components/LoginRegisterPopup";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user, setUser } = useUser();

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <>
      <nav className="flex bg-[#070b1d] items-center justify-between px-4 py-3 shadow-md">
        <div className="flex items-center space-x-2 justify-center">
          <img className="h-16 w-16 con" src="/assets/logo.png" />
          <span className="font-bold text-xl text-[#fdfdfd]">DEEP GEN</span>
        </div>
        <ul className="hidden md:flex items-center  z-50">
          <li className="p-4 hover:text-teal-400 text-gray-300 ">
            <Link to="/image">Ai Image</Link>
          </li>
          <li className="p-4 hover:text-teal-400 text-gray-300 ">
            <Link to="/video">Ai Video</Link>
          </li>
          <li className="p-4 hover:text-teal-400 text-gray-300 ">
            <a>AI Music</a>
          </li>
          {user ? (
            <li className="p-4 hover:text:teal-400 text-gray-300">
              <span>{user.name}</span>
            </li>
          ) : (
            <li
              onClick={() => setShowPopup(true)}
              className="px-5 py-2 mx-auto flex items-center justify-center text-white font-medium bg-gradient-to-r from-teal-500 to-emerald-500 rounded-md shadow hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out"
            >
              <a href="#" className="text-sm">
                Login
              </a>
            </li>
          )}
        </ul>
        <div className="block md:hidden z-50" onClick={handleNav}>
          {nav ? (
            <IoClose size={20} color="white" />
          ) : (
            <TiThMenu size={20} color="white" />
          )}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r-gray-900 ease-in-out duration-500 bg-[#000300] z-50"
              : "fixed left-[-100%]"
          }
        >
          <div className="w-full flex space-x-2 p-4">
            <img className="h-8 w-8" src="/assets/logo.png" />
            <span className="font-bold text-xl text-[#fdfdfd]">DEEP GEN</span>
          </div>
          <div className="p-4 uppercase">
            <ul>
              <li className="p-4 hover:text-teal-400 text-gray-300 border-b border-gray-100">
                <a>AI Image</a>
              </li>
              <li className="p-4 hover:text-teal-400 text-gray-300 border-b border-gray-100">
                <a>AI Video</a>
              </li>
              <li className="p-4 hover:text-teal-400 text-gray-300 border-b border-gray-100">
                <a>AI Music</a>
              </li>
              {user ? (
                <li className="p-4 hover:text:teal-400 text-gray-300">
                  <span>{user.name}</span>
                </li>
              ) : (
                <li
                  onClick={() => setShowPopup(true)}
                  className="p-4 hover:text-teal-400 text-gray-300 border-b border-gray-100"
                >
                  <a>Login</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {showPopup && <LoginRegisterPopup setShowPopup={setShowPopup} />}
    </>
  );
};

export default Navbar;
