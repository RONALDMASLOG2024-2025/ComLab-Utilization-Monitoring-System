import React from "react";
import logo from "../assets/image/UICLogo.png";

export default function Sidebar({logout}) {
  return (
    <div className="bg-white max-h-full h-full w-1/6 rounded-lg bg-opacity-85 p-5 shadow-slate-500 shadow-lg flex flex-col">
      <div className="w-full">
        <img className="w-1/2" src={logo} alt="UIC LOGO" />

        <h2 className="w-full text-red-400  font-bold  text-wrap  md:text-ellipsis">
          ComLab Utilization Monitoring System
        </h2>
      </div>

      <div className="w-full h-fit my-10 ">
        <h1
          className="text-red-500 
        md:text-xl lg:text-4xl
        font-extrabold"
        >
          Good Morning,{" "}
          <span className=" block  lg:text-xl text-lg text-amber-900">
            Sir Dan!
          </span>
        </h1>
      </div>

      <div className=" h-full flex flex-col">
        <button
          className="w-full p-1 my-1 h-fit bg-pink-600 text-white rounded-sm shadow-black shadow-sm hover:bg-pink-900"
          type="button"
        >
          Overview
        </button>

        <button
          className="w-full p-1 my-1 h-fit bg-pink-600 text-white rounded-sm shadow-black shadow-sm hover:bg-pink-900"
          type="button"
        >
          Add Schedule
        </button>

        <button
          className="w-full p-1 my-1 h-fit bg-pink-600 text-white rounded-sm shadow-black shadow-sm hover:bg-pink-900 text-balance"
          type="button"
        >
          Employee Management
        </button>

        <button
          className="w-full p-1 my-1 h-fit bg-pink-600 text-white rounded-sm shadow-black shadow-sm hover:bg-pink-900"
          type="button"
        >
          Settings
        </button>
      </div>

      <button
        className="w-full  h-fit bg-pink-600 text-white rounded-sm shadow-black shadow-sm hover:bg-pink-900"
        type="button"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
