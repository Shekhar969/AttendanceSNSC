import React from 'react';
import snscLogo from './assets/logo.png';
import './App.css';
import {Link} from 'react-router-dom'
import './Components/routing.jsx'
import Navbar from './Components/navBar.jsx'
// importing React Toastify
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />

      <div className="navBar">
        <Navbar/>
      </div> <div >

      <Link to="/Bsc_Csit" className='allSemClasses subject'>
      <h3> Bsc Csit</h3> 
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
