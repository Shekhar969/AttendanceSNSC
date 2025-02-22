import React from "react";
import { Link } from "react-router-dom";
import '../../../../App.css'
import snscLogo from '../../../../assets/logo.png'

const subjects = [
  { name: "C Programming", path: "/subject/Bsc_Csit/firstSem/C-Programming" },
  { name: "Digital Logic", path: "/subjects/BSC_CSIT/firstSem/Digital-Logic" },
  { name: "Introduction to Information Technology", path: "/subjects/BSC_CSIT/firstSem/Introduction-to-Information-Technology" },
  { name: "Mathematics I", path: "/subjects/BSC_CSIT/firstSem/Mathematics-I" },
  { name: "Physics", path:"/subjects/BSC_CSIT/firstSem/Physics"}
];

const firstSem = () => {
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

export default firstSem;
