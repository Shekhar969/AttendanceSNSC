import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/navBar";

import {
  FaLaptopCode,
  FaClipboardList,
} from "react-icons/fa";

import { auth } from "./config/fireBase";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
      }
    );

    return () => unsubscribe();
  }, []);

  // Same extraction style as Navbar
  const username =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <div className="dashboard">
      <div className="navbarSection">
        <Navbar />
      </div>

      <div className="dashboardContent">

        <div className="welcomeSection">

          <h2>
            {user
              ? `Welcome back, ${username} `
              : "Welcome to SNSC Attendance System"}
          </h2>

          <p>
            {user
              ? "Select a module to manage your academic progress and track your records."
              : "Login to access attendance records, course materials, and academic resources."}
          </p>

        </div>

        <div className="cardsContainer">

          <Link
            to="/Bsc_Csit"
            className="dashboardCard"
          >
            <div className="BscCsitIcon cardIcon">
              <FaLaptopCode />
            </div>

            <h3>Bsc CSIT</h3>

            <p>
              Access your course materials,
              syllabus, and academic resources
              for the Computer Science program.
            </p>

          </Link>

          <Link
            to="/AttendanceHistory"
            className="dashboardCard"
          >
            <div className="cardIcon blueIcon">
              <FaClipboardList />
            </div>

            <h3>Check Attendance</h3>

            <p>
              View your real-time attendance logs,
              percentage status, and detailed
              lecture history.
            </p>

          </Link>

        </div>

      </div>
    </div>
  );
}

export default App;