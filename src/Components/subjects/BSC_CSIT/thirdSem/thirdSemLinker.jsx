import React from "react";
import { Link } from "react-router-dom";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";
import { MdAssignmentAdd } from "react-icons/md";
const semester = "thirdSem";
const subjects = [
  {
    name: "Computer Architecture",
    path: "/Bsc_Csit/thirdSem/Computer-Architecture",
  },
  { name: "Computer Graphics", path: "/Bsc_Csit/thirdSem/Computer-Graphics" },
  {
    name: "Data Structure and Algorithm",
    path: "/Bsc_Csit/thirdSem/Data-Structure-and-Algorithm",
  },
  { name: "Numerical Method", path: "/Bsc_Csit/thirdSem/Numerical-Method" },
  { name: "Statistics II", path: "/Bsc_Csit/thirdSem/Statistics-II" },
];

const firstSem = () => {
  return (
    <div className="subjects">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to="/Bsc_Csit">
        <button type="button" className="back-button , subject ">
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
           <Link  to={`/BSC_CSIT/${semester}/${subject.name}/AssignmentHandler`}    className="AddedAssigmentBtn"> <MdAssignmentAdd/>
           </Link>
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default firstSem;
