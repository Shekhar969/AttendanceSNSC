// Navbar.js
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import homeLogo from "../assets/homePageLogo.png";
import { useAuth } from "../config/fireBase"; 

const Navbar = ({ isSidebarVisible, toggleSidebar, LogOutUser }) => {
  const { user, userName } = useAuth();

  return (
    <div className="navbarHome">
      <div className="logoScsn">
        <img src={homeLogo} className="homeLogo" alt="MainLogo" />
      </div>
      {!isSidebarVisible && (
        <FaUserAlt className="userPhoto" onClick={toggleSidebar} />
      )}
      <div className={`sideBar ${isSidebarVisible ? "visible" : ""}`}>
        <IoCloseSharp className="closeNavBar" onClick={toggleSidebar} />
        <div>
          <p className="userName">
            Hello, {userName || (user && user.displayName) || "User"}
          </p>
          <p className="userEmail">{(user && user.email) || "No email provided"}</p>
        </div>
        <button onClick={LogOutUser} className="userLogOutBtn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;