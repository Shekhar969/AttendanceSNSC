import React from "react";
import { Link } from "react-router-dom";
import "../../../../App.css";
import snscLogo from '../../../../assets/logo.png';

const subjects = [
  { name: "Cryptography", path: "/Bsc_Csit/fifthSem/Cryptography" },
  { name: "System Analysis and Design", path: "/Bsc_Csit/fifthSem/SAD" },
  { name: "Simulation and Modeling", path: "/Bsc_Csit/fifthSem/SM" },
  { name: "Web Technology", path: "/Bsc_Csit/fifthSem/WebTechnology" },
  { name: "Design and Analysis of Algorithms", path: "/Bsc_Csit/fifthSem/DAA" },
  { name: "Multimedia", path:"/Bsc_Csit/fifthSem/Multimedia"}
];

const SubjectLinks = () => {
  return (
    <div className="subjects">
        <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to="/Bsc_Csit">
        <button type="button" className="back-button , subject " >
          Back
        </button>
      </Link>
      {subjects.map((subject) => (
        <Link
          to={subject.path}
          key={subject.path}
          aria-label={`Go to ${subject.name} subject`}
        >
          <button className="subject" data-id={subject.name}>
            <h3>{subject.name}</h3>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SubjectLinks;
