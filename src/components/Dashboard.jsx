import React from "react";
import DashboardBg from "../assets/image/DashboardBg2.png";
import LoginBg from "../assets/image/LoginBg.png";
import Sidebar from "./Sidebar.jsx";
import Mainbar from "./Mainbar.jsx";






export default function Dashboard({logout}) {
  return (
    <section
      className="text-gray-600 body-font   h-screen max-h-screen flex justify-items-center align-middle items-center bg-custom-bg bg-cover bg-center p-1"
      style={{ backgroundImage: `url(${DashboardBg})` }}
    >
   
<Sidebar logout={logout}/>
<Mainbar/>

    </section>
  );
}
