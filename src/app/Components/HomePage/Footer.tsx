import React from "react";
type Props = {};
export default function Footer({}: Props) {
  return (
    <footer className="w-full absolute bottom-0">
      <div className="bg-[#edeeef] border-b-[1px] border-gray-300 px-5 md:px-10 py-0 sm:py-[2px]  md:py-[5.8px] lg:py-[9px]">
        <span className="text-[8px] sm:text-[10px] md:text-[12px] ">India</span>
      </div>

      <div className="w-full bg-[#edeeef] py-1 sm:py-[2px] md:py-[5.8px] lg:py-[9px] px-5 md:px-10 flex">
        <div className="text-[8px] sm:text-[10px] md:text-[12px] space-x-2 md:space-x-4">
          <a href="">About</a>
          <a href="">Advertising</a>
          <a href="">Business</a>
          <a href="">How Search works</a>
        </div>

        <div className="text-[8px] sm:text-[10px] md:text-[12px] space-x-2 md:space-x-4 ml-auto ">
          <a href="">Privacy</a>
          <a href="">Terms</a>
          <a href="">Settings</a>
        </div>
      </div>
    </footer>
  );
}
