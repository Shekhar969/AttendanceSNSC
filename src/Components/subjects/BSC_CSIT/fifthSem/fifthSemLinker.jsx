import React from "react";
import { Link } from "react-router-dom";
import "../../../../App.css";
import snscLogo from '../../../../assets/logo.png';

const subjects = [
  { name: "Cryptography", path: "/subjects/BSC_CSIT/fifthSem/Cryptography" },
  { name: "System Analysis and Design", path: "/subjects/BSC_CSIT/fifthSem/SAD" },
  { name: "Simulation and Modeling", path: "/subjects/BSC_CSIT/fifthSem/SM" },
  { name: "Web Technology", path: "/subjects/BSC_CSIT/fifthSem/WebTechnology" },
  { name: "Design and Analysis of Algorithms", path: "/subjects/BSC_CSIT/fifthSem/DAA" },
  { name: "Multimedia", path:"/subjects/BSC_CSIT/fifthSem/Multimedia"}
];

const SubjectLinks = () => {
  return (
    <div className="subjects">
        <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to="/">
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
