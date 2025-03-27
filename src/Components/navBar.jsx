import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import homeLogo from "../../public/homePageLogo.webp";
import { auth } from "../config/fireBase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';


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
  const [showSemesters, setShowSemesters] = useState(false);
  const location = useLocation();


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
    setShowSemesters(false); 
  };

  const toggleSemesters = () => {
    setShowSemesters(!showSemesters);
  };
  useEffect(() => {
    setShowSemesters(false); // Reset semesters when navigating to a new page
  }, [location]);

  const displayName = userName || user?.displayName || "User";
  // const email = user?.email || "No email provided";
  return (
    <div className="navbarHome">
      <div className="logoScsn">
        <img src={homeLogo} className="homeLogo" alt="MainLogo" />
      </div>

      {isSidebarVisible ? (
        <div className="sideBar visible">
         <IoCloseSharp className="closeNavBar" onClick={toggleSidebar} />
         
          
          {!showSemesters && (  
            <div>
         
              <p className="userName">Hello, {displayName}</p>
            </div>
          )}

          
          {!showSemesters && ( 
            <>
              <Link to="/" className="side-subject">Home</Link>
              <button onClick={toggleSemesters} className="side-subject">Semesters</button>
            </>
          )}

          
          {showSemesters && (
            <ul>
              <li>
                <Link to="/Bsc_Csit/firstSem">First Semester</Link>
              </li>
              <li>
                <Link to="/Bsc_Csit/thirdSem">Third Semester</Link>
              </li>
              <li>
                <Link to="/Bsc_Csit/fifthSem">Fifth Semester</Link>
              </li>
              <li>
                <Link to="/Bsc_Csit/seventhSem">Seventh Semester</Link>
              </li>
            </ul>
          )}

          {!showSemesters && (
            user ? (
              <Link to="/auth" className="userLogOutBtn" onClick={LogOutUser}>
                Log Out
              </Link>
            ) : (
              <Link to="/auth" className="userSignUpBtn">
                Verify You
              </Link>
            )
          )}
        </div>
      ) : (
        <FaUserAlt className="userPhoto" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Navbar;
