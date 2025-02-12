import React from 'react';
import snscLogo from './assets/logo.png';
import './App.css';
import {Link} from 'react-router-dom'
import './Components/routing.jsx'
// import Auth from './Components/authecantance'
import AuthHandelar from './Components/auth/handler.jsx'
import Navbar from './Components/navBar.jsx'

function App() {
  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />

    <div className="authHandelar">
      <AuthHandelar/>
    </div>
      <div className="navBar">
        <Navbar/>
      </div>
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
       {/* <div>
        <Auth/>
      </div>  */}
    </div>
  );
}

export default App;
