import React, { useState, useEffect } from "react";
import logoImage from "../assets/image/loginImage.jpg";
import LoginBg from "../assets/image/LoginBg.png";

export default function Login({ signUp, login }) {
  const [password, setPassword] = useState("ronald123");
  const [email, setEmail] = useState("ronald@uic.edu");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      // Hide the notification after 3 seconds (3000 ms)
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      // Cleanup the timer when notification changes
      return () => clearTimeout(timer);
    }
  }, [notification]); // This will re-run whenever the notification state changes

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setNotification({
        message: "Email and password cannot be empty.",
        type: "error",
      });
      return;
    }

    const result = await login({ email, password });

    if (result.success) {
      setNotification({ message: result.message, type: "success" });
    } else {
      setNotification({ message: result.message, type: "error" });
    }
  };

  return (
    <section
      className="text-gray-600 body-font h-screen flex justify-items-center align-middle items-center bg-custom-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="ease container bg-white bg-opacity-75 mx-auto flex px-5 py-5 md:flex-row flex-col items-center h-fit shadow-slate-500 shadow-md rounded-2xl w-fit">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="saturate-150 object-cover object-center rounded-lg shadow-2xl"
            alt="hero"
            src={logoImage}
            draggable="false"
          />
        </div>

        <div className="lg:w-full md:w-1/2 lg:pl-16 md:pl-8 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
            Login to your Account
          </h1>
          <p className="mb-4 leading-relaxed">
            ComLab Utilization Monitoring System
          </p>

          {/* Notification Message with Interval */}
          {notification && (
            <div
              className={`w-full p-2 mb-3 rounded text-center text-white ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notification.message}
            </div>
          )}

          <div className="w-full mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="example@uic.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full mb-0">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-5"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-1 items-center mb-4">
            <div className="flex-1 flex items-center">
              <input
                type="checkbox"
                name="remember_password"
                id="remember_password"
              />
              <label className="ml-1" htmlFor="remember_password">
                Remember password
              </label>
            </div>

            <div className="ml-auto text-red-500">
              <a href="#" rel="noopener noreferrer">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            className="mb-4 w-full text-white bg-red-500 py-2 px-6 outline-red-500 hover:bg-red-700 border-2 border-red-500 rounded-full text-lg text-center transition-colors duration-200 ease-in-out"
            type="button"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          <button
            className="w-full text-red-500 bg-white border-red-500 border-2 py-2 px-6 outline-red-500 hover:bg-red-700 hover:text-white rounded-full text-lg text-center transition-colors duration-200 ease-in-out"
            type="button"
            onClick={signUp}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </section>
  );
}
