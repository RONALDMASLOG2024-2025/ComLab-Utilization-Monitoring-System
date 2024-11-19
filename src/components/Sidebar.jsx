import React, { useState } from "react";
import logo from "../assets/image/UICLogo.png";

export default function Sidebar({ logout, handleView }) {
  const [number, setNumber] = useState(1);

  const handleToggleView = (num) => {
    setNumber(num);
    handleView(num);
  };

  return (
    <div className="bg-white max-h-full h-full w-full sm:w-1/4 lg:w-1/6 rounded-lg bg-opacity-85 p-5 shadow-slate-500 shadow-lg flex flex-col items-center md:items-start">
      <div className="w-full flex flex-col items-center md:items-start">
        <img
          className="w-1/2 sm:w-3/4 lg:w-1/2 mb-4"
          src={logo}
          alt="UIC LOGO"
        />
        <h2 className="text-center md:text-left text-red-400 font-bold text-wrap sm:text-lg lg:text-xl">
          ComLab Utilization Monitoring System
        </h2>
      </div>

      <div className="w-full h-fit my-10 text-center md:text-left">
        <h1 className="text-red-500 text-lg sm:text-xl lg:text-2xl font-extrabold">
          Welcome,{" "}
          <span className="block lg:text-lg sm:text-sm text-amber-900">
            Sir Dan!
          </span>
        </h1>
      </div>

      <div className="h-full flex flex-col w-full">
        <button
          className="w-full p-2 sm:py-3 my-2 text-sm sm:text-base bg-pink-600 text-white rounded shadow-md hover:bg-pink-900 transition-all"
          type="button"
          onClick={() => handleToggleView(1)}
        >
          Dashboard
        </button>

        <button
          className="w-full p-2 sm:py-3 my-2 text-sm sm:text-base bg-pink-600 text-white rounded shadow-md hover:bg-pink-900 transition-all"
          type="button"
          onClick={() => handleToggleView(2)}
        >
          Schedule
        </button>

        <button
          className="w-full p-2 sm:py-3 my-2 text-sm sm:text-base bg-pink-600 text-white rounded shadow-md hover:bg-pink-900 transition-all"
          type="button"
          onClick={() => handleToggleView(3)}
        >
          Employee Management
        </button>

        <button
          className="w-full p-2 sm:py-3 my-2 text-sm sm:text-base bg-pink-600 text-white rounded shadow-md hover:bg-pink-900 transition-all"
          type="button"
          onClick={() => handleToggleView(5)}
        >
          Logs
        </button>

        <button
          className="w-full p-2 sm:py-3 my-2 text-sm sm:text-base bg-pink-600 text-white rounded shadow-md hover:bg-pink-900 transition-all"
          type="button"
          onClick={() => handleToggleView(4)}
        >
          Settings
        </button>
      </div>

      <button
        className="w-full p-2 sm:py-3 mt-auto text-sm sm:text-base bg-pink-600 text-white rounded shadow-md hover:bg-pink-900 transition-all"
        type="button"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
