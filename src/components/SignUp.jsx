import React, { useState, useEffect } from "react";
import LoginBg from "../assets/image/LoginBg.png";

export default function SignUp({ goBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match. Please try again.");
      setNotification({
        message: "Passwords do not match. Please try again.",
        type: "error",
      });
      return;
    }

    try {
      const response = await window.api.createAdmin({ name, email, password });
      console.log(response);
      if (response.success) {
        setNotification({
          message: response.message,
          type: "success",
        });
        setIsFormSubmitted(true);
        // Reset form fields after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setNotification({
          message: `Error: ${response.message}`,
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: `Error: ${error.message}`,
        type: "error",
      });
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <section
      className="text-gray-600 body-font h-screen flex justify-items-center align-middle items-center bg-custom-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="container bg-white bg-opacity-75 rounded-2xl w-fit h-fit mx-auto p-5 shadow-slate-500 shadow-md">
        <div className="flex">
          <div>
            <h1 className="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
              Sign up
            </h1>
            <p className="mb-4 leading-relaxed">
              ComLab Utilization Monitoring System
            </p>
          </div>

          <div>
            <button
              onClick={goBack}
              className="hover:text-red-500"
              type="button"
            >
              {"<" + "Go Back"}
            </button>
          </div>
        </div>

        {notification && (
          <div
            className={`mb-4 p-4 rounded ${
              notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {notification.message}
          </div>
        )}

        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="w-full mb-2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Juan Dela Chiz"
              required
            />
          </div>

          <div className="w-full mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="example@uic.edu.ph"
              required
            />
          </div>

          <div className="w-full mb-2">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="w-full mb-2">
            <label
              htmlFor="confirmPassword"
              className="leading-7 text-sm text-gray-500"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white bg-opacity-90 focus:bg-transparent focus:ring-2 focus:ring-pink-900 rounded border border-gray-600 focus:border-pink-500 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            className="mt-4 w-full text-white bg-red-500 py-2 px-6 outline-red-500 hover:bg-red-700 border-2 border-red-500 rounded-full text-lg text-center transition-colors duration-200 ease-in-out"
            type="submit"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
}
