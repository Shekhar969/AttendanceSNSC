import snscLogo from "./assets/logo.png";
import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  // const [selectedSub, setSelectedSub] = useState("");
  // const [isSubHidden, setIsSubHidden] = useState(false);

  // const handleSubjectSelection = (event) => {
  //   const subSelected = event.target.dataset.id;
    // console.log('subselected', event);
    // console.log('subselected', event.target);
    // console.log('subselected', event.target.dataset);
    // console.log('subselected', event.target.dataset.id);

    // if (subSelected) {
    //   setSelectedSub(subSelected);
    //   setIsSubHidden(true);
    //   console.log("Selected Subject: ", subSelected); // Log the selected subject
    // }
  // };

  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />

        <div className="subjects">
         <Link to="cryptography"> <button
            className="subject"
            data-id="Cryptography"
          >
            <h3>Cryptography</h3>
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

      
        <>
          <div>
            <h2>You have selected: </h2>
          </div>
         
        </>
    

    </div>
  );
}

export default App;
