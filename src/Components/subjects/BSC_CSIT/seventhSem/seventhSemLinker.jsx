import React from "react";
import { Link } from "react-router-dom";
import '../../../../App.css'
import snscLogo from '../../../../assets/logo.png'
import { MdAssignmentAdd } from "react-icons/md";
const semester = "seventhSem";

const subjects = [
  { name: "Advanced Java Programming", path: "/Bsc_Csit/seventhSem/Advanced-Java-Programming" },
  { name: "Database Administrator", path: "/Bsc_Csit/seventhSem/Database-Administrator" },
  { name: "International Marketing", path: "/Bsc_Csit/seventhSem/International-Marketing" },
  { name: "Network Security", path: "/Bsc_Csit/seventhSem/Network-Security" },
  { name: "Project Work", path:"/Bsc_Csit/seventhSem/Project-Work"}
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
