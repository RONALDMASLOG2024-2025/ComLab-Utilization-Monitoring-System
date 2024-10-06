import React from "react";

import logoImage from "../assets/image/loginImage.jpg";
import LoginBg from "../assets/image/LoginBg.png";

export default function Login() {
  return (
    <section
      class="text-gray-600 body-font  h-screen flex justify-items-center align-middle items-center bg-custom-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div class="container bg-white bg-opacity-75 mx-auto flex px-5 py-5 md:flex-row flex-col items-center h-fit rounded-2xl w-fit">
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            class="saturate-150 object-cover object-center rounded-lg  shadow-2xl "
            alt="hero"
            src={logoImage}
            draggable="false"
          />
        </div>

        <form
          action=""
          method="post"
          class="lg:w-full md:w-1/2 lg:pl-16 md:pl-8 flex flex-col md:items-start md:text-left items-center text-center"
        >
          <h1 class="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
            Login to your Account
          </h1>

          <p class="mb-4 leading-relaxed">
            ComLab Utilization Monitoring System
          </p>

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

          <div class=" w-full mb-0">
            <label for="password" class="leading-7 text-sm text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-5"
              placeholder="Enter Password"
            />
          </div>

          <div class="w-full flex flex-1 items-center mb-4">
            <div class="flex-1 flex items-center">
              <input
                type="checkbox"
                name="remember_password"
                id="remember_password"
              />
              <label class="ml-1" htmlFor="remember_password">
                Remember password
              </label>
            </div>

            <div class="ml-auto text-red-500">
              <a href="#" rel="noopener noreferrer">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            class="mb-4 w-full text-white bg-red-500  py-2 px-6 outline-red-500 hover:bg-red-700 border-2 border-red-500 rounded-full text-lg text-center transition-colors duration-200 ease-in-out"
            type="submit"
          >
            LOGIN
          </button>
          <button
            class=" w-full text-red-500 bg-white  border-red-500 border-2 py-2 px-6 outline-red-500 hover:bg-red-700 hover:text-white rounded-full text-lg text-center transition-colors duration-200 ease-in-out"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </section>

    // <form action="" method="post">
    //   <h2>Login to your Account</h2>
    //   <p>ComLab Utilization Monitoring System</p>

    //   <label htmlFor="email">Email</label>
    //   <input
    //     type="email"
    //     name="email"
    //     id="email"
    //     placeholder="email@uic.edu.ph"
    //   />

    //   <label htmlFor="password">Password</label>
    //   <input
    //     type="password"
    //     name="password"
    //     id="password"
    //     placeholder="********"
    //   />
    // </form>

    // <div className="">
    //   <div className="bg-gray-200 rounded-sm w-full h-full">
    //     {/* <img className="max-w-screen-md" src={logoImage} alt="loginImage" /> */}

    //     <form action="" method="post">
    //       <h2>Login to your Account</h2>
    //       <p>ComLab Utilization Monitoring System</p>

    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         placeholder="email@uic.edu.ph"
    //       />

    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="********"
    //       />
    //     </form>
    //   </div>
    // </div>
  );
}
