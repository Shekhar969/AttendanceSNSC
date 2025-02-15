import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import homeLogo from "../assets/homePageLogo.png";
import { auth } from "../config/fireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return { user, userName: user?.displayName, setUser };
};

const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { user, userName, setUser } = useAuth();

  const LogOutUser = async () => {
      // console.log("log out button clicked")
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

  return (
    <div className="navbarHome">
      <div className="logoScsn">
        <img src={homeLogo} className="homeLogo" alt="MainLogo" />
      </div>

      {isSidebarVisible ? (
        <div className="sideBar visible">
          <IoCloseSharp className="closeNavBar" onClick={toggleSidebar} />
          <div>
            <p className="userName">Hello, {displayName}</p>
            <p className="userEmail">{email}</p>
          </div> 
            <Link to="/auth" className="userSignUpBtn">
              Verify You
            </Link>
            <Link to="/auth" className="userLogOutBtn" onClick={LogOutUser}>
            Log Out
            </Link>
          
        </div>
      ) : (
        <FaUserAlt className="userPhoto" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Navbar;