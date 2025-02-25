import React from "react";
import { Link } from "react-router-dom";
import '../../../../App.css'
import snscLogo from '../../../../assets/logo.png'
import { MdAssignmentAdd } from "react-icons/md";


const subjects = [
  { name: "C Programming", path: "/Bsc_Csit/firstSem/C-Programming" },
  { name: "Digital Logic", path: "/Bsc_Csit/firstSem/Digital-Logic" },
  { name: "Introduction to Information Technology", path: "/Bsc_Csit/firstSem/Introduction-to-Information-Technology" },
  { name: "Mathematics I", path: "/Bsc_Csit/firstSem/Mathematics-I" },
  { name: "Physics", path:"/Bsc_Csit/firstSem/Physics"}
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
          <div className="eachSubjectContainer">
            <button className="subject eachsubject" data-id={subject.name}>
              <h3>{subject.name}</h3>
           <Link to="/BSC_CSIT/AssignmentHandeler" className="AddedAssigmentBtn"> <MdAssignmentAdd/>
           </Link>
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default firstSem;
