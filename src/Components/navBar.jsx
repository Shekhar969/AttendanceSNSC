import React, { useState, useEffect, useRef } from "react";
import { FaUserAlt } from "react-icons/fa";
import homeLogo from "../../public/homePageLogo.webp";
import { auth } from "../config/fireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import "../App.css";

import {
  FaHome,
  FaClipboardList,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    userName: user?.displayName,
    setUser,
  };
};

const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { user, userName, setUser } = useAuth();

  const sidebarRef = useRef(null);

  const LogOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Successfully logged out");
      setUser(null);
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const displayName = userName || user?.displayName || "User";

  const email = user?.email || "No email provided";

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = homeLogo;
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbarHome">
      <div className="logoScsn">
        <img src={homeLogo} className="homeLogo" alt="MainLogo" />
      </div>

      {isSidebarVisible ? (
        <div ref={sidebarRef} className="sideBar visible">
          <div className="profile">
            <div className="profileImage">{displayName?.charAt(0) || "U"}</div>

            <div>
              <h4>{displayName || "User"}</h4>

              <p>{email}</p>
            </div>
          </div>

          <div className="menu">
            <NavLink
              to="/Bsc_Csit"
              className={({ isActive }) =>
                isActive ? "menuItem active" : "menuItem"
              }
            >
              <FaHome />
              <span>Bsc Csit</span>
            </NavLink>

            <NavLink
              to="/AttendanceHistory"
              className={({ isActive }) =>
                isActive ? "menuItem active" : "menuItem"
              }
            >
              <FaClipboardList />
              <span>Attendance</span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "menuItem active" : "menuItem"
              }
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                isActive ? "menuItem active" : "menuItem"
              }
            >
              <FaQuestionCircle />
              <span>Support</span>
            </NavLink>
          </div>
<div className="authSection">
          {user ? (
            <Link to="/auth" className="userLogOutBtn" onClick={LogOutUser}>
              Log Out
            </Link>
          ) : (
            <Link to="/auth" className="userSignUpBtn">
              Verify You
            </Link>
          )}</div>
        </div>
      ) : (
        <FaUserAlt className="userPhoto" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Navbar;
