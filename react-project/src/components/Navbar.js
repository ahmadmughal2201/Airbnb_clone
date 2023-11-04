import React from "react";
import logo from "../assets/logo.png";
import { BiWorld, BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%]  ">
      <div className="flex items-center sm:mx-2 md:mx-10 lg:mx-12 gap-20">
        {/* Left */}
        <div className="  h-0  flex">
          <img src={logo} className=" object-cover -my-3" />
        </div>
        {/* Middle */}
        <div class="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full">
          <input
            type="search"
            placeholder=""
            class="py-2.5 w-[20rem] rounded-full outline-0"
          />
          <div class="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
            <button class="w-full">Place</button>
            <button class="border-l border-x px-6">Time</button>
            <button class="w-full text-gray-600/60 pl-2">Group Size</button>
          </div>
          <div class="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch class="text-white w-full" />
          </div>
        </div>
        {/* Right */}
        <div class="flex items-center justify-end pr-3 p-4 md:w-1/2 font-semibold text-gray-600">
          <p class="text-[17px]">Rent House</p>
          <div class="flex items-center mx-8 gap-1">
            <BiWorld class="" />
            <div class="">EN</div>
          </div>

          <div class="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
            <p>Sign in</p>
            <BiUser class="text-[22px]" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;