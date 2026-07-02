import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/navBar";

import {
  FaLaptopCode,
  FaClipboardList,
  FaCalendarAlt,
  FaStar,
  FaMoneyBill,
  FaBullhorn,
} from "react-icons/fa";

import "./App.css";

function App() {
  return (
    <div className="dashboard">
      <div className="navbarSection">
        <Navbar />
      </div>

      <div className="dashboardContent">
        <div className="welcomeSection">
          <h1>Welcome back, Shekhar.</h1>
          <p>
            Select a module to manage your academic progress and track your
            records.
          </p>
        </div>

        <div className="cardsContainer">
          <Link to="/Bsc_Csit" className="dashboardCard">
            <div className="BscCsitIcon cardIcon ">
              <FaLaptopCode />
            </div>

            <h3>Bsc CSIT</h3>

            <p>
              Access your course materials, syllabus, and academic resources for
              the Computer Science program.
            </p>
          </Link>

          <Link to="/AttendanceHistory" className="dashboardCard">
            <div className="cardIcon blueIcon">
              <FaClipboardList />
            </div>

            <h3>Check Attendance</h3>

            <p>
              View your real-time attendance logs, percentage status, and
              detailed lecture history.
            </p>
          </Link>
        </div>
        {/* 
          <div className="bottomActions">

            <div className="smallCard">
              <FaCalendarAlt />
              <span>Timetable</span>
            </div>

            <div className="smallCard">
              <FaStar />
              <span>Grades</span>
            </div>

            <div className="smallCard">
              <FaMoneyBill />
              <span>Fees</span>
            </div>

            <div className="smallCard">
              <FaBullhorn />
              <span>Notices</span>
            </div>

          </div> */}
      </div>
    </div>
  );
}

export default App;
