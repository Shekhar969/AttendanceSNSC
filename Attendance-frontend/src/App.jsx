import snscLogo from "./assets/logo.png";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const subjects = [
    { name: "Cryptography", path: "cryptography" },
    { name: "Design and Analysis of Algorithms", path: "DAA" },
    { name: "System Analysis and Design", path: "SAD" },
    { name: "Simulation and Modeling", path: "SM" },
    { name: "Web Technology", path: "WebTechnology" }
  ];

  return (
    <div className="mainContainer">
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />
      <div className="subjects">
        {subjects.map(subject => (
          <Link to={subject.path} key={subject.path} aria-label={`Go to ${subject.name} subject`}>
            <button className="subject" data-id={subject.name}>
              <h3>{subject.name}</h3>
              <h4>sir</h4>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
