import React, {useState , useEffect} from 'react';
import snscLogo from './assets/logo.png';
import './App.css';
import {Link} from 'react-router-dom'
import './Components/routing.jsx'
import Navbar from './Components/navBar.jsx'
// importing React Toastify
import 'react-toastify/dist/ReactToastify.css';

import PreLoader from './Components/preloader.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },2000);
  },[]);
  return (
    <>
    {loading ? <PreLoader /> :
    <div className="mainContainer">
   
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />

      <div className="navBar">
        <Navbar/>
      </div>
       <div >
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
     };

    </>
  );
}

export default App;
