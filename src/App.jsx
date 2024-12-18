import snscLogo from "./assets/logo.png";
import "./App.css";
import { useState } from "react";

function App() {
  const [selectedSub, setSelectedSub] = useState("");
  const [isSubHidden, setIsSubHidden] = useState(false);

  const handleSubjectSelection = (event) => {
    const subSelected = event.target.dataset.id;

    if (subSelected) {
      setSelectedSub(subSelected);
      setIsSubHidden(true);
      console.log("Selected Subject: ", subSelected);
    }
  };

  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />

      {!isSubHidden && (
        <div className="subjects">
          <button
            className="subject"
            data-id="Cryptography"
            onClick={handleSubjectSelection}
          >
            <h3>Cryptography</h3>
            <h4>sir</h4>
          </button>
          <button
            className="subject"
            data-id="Design and Analysis of Algorithms"
            onClick={handleSubjectSelection}
          >
            <h3>Design and Analysis of Algorithms</h3>
            <h4>sir</h4>
          </button>
          <button
            className="subject"
            data-id="System Analysis and Design"
            onClick={handleSubjectSelection}
          >
            <h3>System Analysis and Design</h3>
            <h4>sir</h4>
          </button>
          <button
            className="subject"
            data-id="Simulation and Modeling"
            onClick={handleSubjectSelection}
          >
            <h3>Simulation and Modeling</h3>
            <h4>sir</h4>
          </button>
          <button
            className="subject"
            data-id="Web Technology"
            onClick={handleSubjectSelection}
          >
            <h3>Web Technology</h3>
            <h4>sir</h4>
          </button>
        </div>
      )}

      {selectedSub && (
        <div>
          <h2>You have selected: {selectedSub}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
