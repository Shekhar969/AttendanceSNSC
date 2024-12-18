import snscLogo from "./assets/logo.png";
import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {

  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />
        <div className="subjects">
         <Link to="cryptography"> <button
            className="subject"
            data-id="Cryptography"
          >
            <h3>CRYPTOGRAPHY</h3>
            <h4>sir</h4>
          </button></Link>
          
          <Link to="DAA"><button
            className="subject"
            data-id="Design and Analysis of Algorithms"
          >
            <h3>Design and Analysis of Algorithms</h3>
            <h4>sir</h4>
          </button>
          </Link>

         <Link to="SAD">
         <button
            className="subject"
            data-id="System Analysis and Design"
          >
            <h3>System Analysis and Design</h3>
            <h4>sir</h4>
          </button>
         </Link>

          <Link to="SM">
          <button
            className="subject"
            data-id="Simulation and Modeling"
          >
            <h3>Simulation and Modeling</h3>
            <h4>sir</h4>
          </button></Link>

         <Link to="WebTechnology">
         <button
            className="subject"
            data-id="Web Technology"
            
          >
            <h3>Web Technology</h3>
            <h4>sir</h4>
          </button>
          </Link>
        </div>
    </div>
  );
}

export default App;
