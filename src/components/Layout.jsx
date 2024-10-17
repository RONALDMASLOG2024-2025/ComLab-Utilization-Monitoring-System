import React, { useState } from "react";
import Login from "./Login.jsx";
import LoginBg from "../assets/image/LoginBg.png";
import SignUp from "./SignUp.jsx";
import Dashboard from "./Dashboard.jsx";

export default function Layout() {
  const [isSignUp, setSignUp] = useState(false);
  const [isLogin, setLogin] = useState(false);
  
  const handleLogin = () => {
    setLogin(() => !isLogin);
  };

  const handleSetSignUP = () => {
    setSignUp(() => !isSignUp);
  };

  return (
    <>
      {isLogin ? (
        <Dashboard logout={handleLogin} />
      ) : isSignUp ? (
        <SignUp goBack={handleSetSignUP} />
      ) : (
        <Login login={handleLogin} signUp={handleSetSignUP} />
      )}
    </>
  );
}
