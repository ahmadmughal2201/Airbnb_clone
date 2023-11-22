import React, { useState } from "react";
import logo from "../assets/logo.png";
import { BiWorld, BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import SignUp from './SignUp';
import { useMyContext } from './MyContext';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Link } from 'react-router-dom';

const Navbar = () => {

  const { myVariable } = useMyContext();
  const [isSignUpVisible, setIsSignUpVisible] = useState();
  const navigate = useNavigate();
  const openDialog = () => {
    navigate("/signup");
  };

  const closeDialog = () => {
    setIsSignUpVisible(false);
  };

  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%]">
      <div className="flex items-center sm:mx-2 md:mx-10 lg:mx-12 gap-20">
        {/* Left */}
        <div className="h-0 flex">
          <img src={logo} className="object-cover -my-3" alt="Logo" />
        </div>
        {/* Middle */}
        {/* ... (your middle content) */}
        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full ">
          <input
            type="search"
            placeholder=""
            className="py-2.5 w-[20rem] rounded-full outline-0"
          />
          <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
            <button className="w-full">Place</button>
            <button className="border-l border-x px-6">Time</button>
            <button className="w-full text-gray-600/60 pl-2">Group Size</button>
          </div>
          <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch className="text-white w-full" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end pr-3 p-4 md:w-1/2 font-semibold text-gray-600">
          <p className="text-[17px]">Rent House</p>
          <div className="flex items-center mx-8 gap-1">
            <BiWorld />
            <div>EN</div>
          </div>

          <div className="flex items-center mx-8 gap-1">
            <RxAvatar className="text-2xl" />
          </div>


          <div
            className="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out"
            onClick={openDialog}
          >
            <p>Sign In</p>
            <BiUser className="text-[22px]" />
            {isSignUpVisible && <SignUp />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
