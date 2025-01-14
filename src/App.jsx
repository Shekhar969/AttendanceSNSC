import React from 'react';
import snscLogo from './assets/logo.png';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <div>
        <Link to="/Subjects" className="subject">
          <h3>Subjects</h3>
        </Link>
      </div>
      <div>
      <Link to="/AttendanceHistory" className="subject" >
          <h3 >Check Attendance</h3>
        </Link>
      </div>
    </div>
  );
}

export default App;
