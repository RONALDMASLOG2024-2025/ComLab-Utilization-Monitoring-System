import React from "react";

export default function Setting() {
  return (
    <div className="bg-white w-full h-fit rounded-lg bg-opacity-95 mt-6 shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="font-bold text-3xl text-gray-800">Account Settings</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Details */}
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-xl text-gray-700 mb-4">Profile Details</h2>
          <div className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-gray-600 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value="Danny"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value="danny@uic.edu.ph"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-xl text-gray-700 mb-4">Change Password</h2>
          <p className="text-gray-600 mb-4">
            To keep your account secure, please remember to update your password regularly.
          </p>
          <p className="text-gray-600 mb-6">
            Click the 'Change Password' button below to set a new password.
          </p>
          <button
            className="w-full text-white bg-red-500 py-2 px-6 rounded-md font-semibold hover:bg-red-600 transition-colors duration-200 ease-in-out"
            type="button"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
