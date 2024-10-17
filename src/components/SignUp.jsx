import React from "react";

import LoginBg from "../assets/image/LoginBg.png";

export default function SignUp({ goBack }) {
  return (
    <section
      className="text-gray-600 body-font   h-screen flex justify-items-center align-middle items-center bg-custom-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div
        className="container bg-white
    bg-opacity-75 rounded-2xl w-fit h-fit mx-auto p-5 shadow-slate-500 shadow-md"
      >
        <div className="flex">
          <div>
            <h1 class="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
              Sign up
            </h1>

            <p class="mb-4 leading-relaxed">
              ComLab Utilization Monitoring System
            </p>
          </div>

          <div>
            {" "}
            <button
              onClick={goBack}
              className="hover:text-red-500"
              type="button"
            >
              {"<" + "Go Back"}
            </button>
          </div>
        </div>

        <form action="" method="post">
          <div class="w-full mb-2">
            <label for="name" class="leading-7 text-sm text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Juan Dela Chiz"
            />
          </div>

          <div class="w-full mb-2">
            <label for="email" class="leading-7 text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="example@uic.edu.ph"
            />
          </div>

          <div class="w-full mb-2">
            <label for="password" class="leading-7 text-sm text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Enter password"
            />
          </div>

          <div class="w-full mb-2">
            <label
              for="confirmPassword"
              class="leading-7 text-sm text-gray-500"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Confirm password"
            />
          </div>

          <button
            class="mt-4 w-full text-white bg-red-500  py-2 px-6 outline-red-500 hover:bg-red-700 border-2 border-red-500 rounded-full text-lg text-center transition-colors duration-200 ease-in-out"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
}
