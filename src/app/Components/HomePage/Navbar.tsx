import React from "react";
import { TbGridDots } from "react-icons/tb";
type Props = {};
export default function Navbar({}: Props) {
  return (
    <nav className=" sticky z-50 top-0 left-0  bg-gray-50 w-full">
      <div className="h-10 md:h-12 lg:h-14 w-full transition-all duration-300 ease-in-out flex justify-center px-6 items-center ">
        <p className="flex ml-auto justify-center space-x-3 items-center lg:space-x-5">
          <span className="text-[8px] md:text-xs lg:text-sm text-black">
            Gmail
          </span>
          <span className="text-[8px]  md:text-xs lg:text-sm text-black">
            Images
          </span>
          <TbGridDots className="text-sm md:text-xl lg:text-2xl text-gray-600" />
          <div className="rounded-full bg-pink-700 w-5 h-5 md:w-7 md:h-7  lg:w-9 lg:h-9 flex justify-center items-center">
            <span className="text-[8px] md:text-[11px] lg:text-sm text-white">
              SN
            </span>
          </div>
        </p>
      </div>
    </nav>
  );
}
