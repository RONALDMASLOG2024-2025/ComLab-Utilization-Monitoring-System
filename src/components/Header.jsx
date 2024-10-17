import React from "react";
import logo from "../assets/image/UICLogo.png";
export default function Header() {
  return (
    <div className="w-full shadow-slate-500 shadow-sm h-fit bg-white bg-opacity-85 rounded-md p-1 flex justify-end">
      <input
        className="w-fit bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded-full border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="search"
        name="search"
        id="search"
        placeholder="Search"
      />

      <div className="mr-4 flex w-fit justify-end gap-2 items-center">
        <div>
          <h3 className="text-xs font-bold">Danny</h3>
          <p className="text-xs">CCS Staff</p>
        </div>

        <img className="w-1/4" src={logo} alt="uic logo" />
      </div>
    </div>
  );
}
