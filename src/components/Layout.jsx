import React, { useState } from "react";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";


export default function Layout() {
  const [isSignUp, setSignUp] = useState(false);
  const [isLogin, setLogin] = useState(false);

  // Handle login submission
  const handleLogin = async ({ email, password }) => {
    if (email === " " || password === " ") {
      console.log("Please fill all the fields!");
      return;
    }

    try {
      const result = await window.api.loginAdmin({ email, password });

      // Set isLogin to true if login is successful
      if (result.success) {
        setLogin(true);
        return result;
      } else {
        console.log(result.message || "Login failed. Please try again.");
        return result;
      }
    } catch (error) {
      console.log("An error occurred during login. Please try again.");
      console.log(error);
    }
  };

  // Toggle between Login and Sign Up forms
  const handleToggleSignUp = () => {
    setSignUp((prevSignUp) => !prevSignUp);
  };

  // Handle logout by resetting isLogin to false
  const handleLogout = () => {
    setLogin(false);
  };

  return (
    <>
      
      {isLogin ? (
        <Dashboard logout={handleLogout} />
      ) : isSignUp ? (
        <SignUp goBack={handleToggleSignUp} />
      ) : (
        <Login login={handleLogin} signUp={handleToggleSignUp} />
      )}
    </>
  );
}
