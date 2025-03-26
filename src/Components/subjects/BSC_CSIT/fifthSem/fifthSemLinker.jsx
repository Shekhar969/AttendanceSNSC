import React from "react";
import { Link } from "react-router-dom";
import "../../../../App.css";
import { MdAssignmentAdd } from "react-icons/md";
const semester = "fifthSem";
const subjects = [
  { name: "Cryptography", path: "/Bsc_Csit/fifthSem/Cryptography" },
  { name: "System Analysis and Design", path: "/Bsc_Csit/fifthSem/SAD" },
  { name: "Simulation and Modeling", path: "/Bsc_Csit/fifthSem/SM" },
  { name: "Web Technology", path: "/Bsc_Csit/fifthSem/WebTechnology" },
  { name: "Design and Analysis of Algorithms", path: "/Bsc_Csit/fifthSem/DAA" },
  { name: "Multimedia", path: "/Bsc_Csit/fifthSem/Multimedia" },
];

const SubjectLinks = () => {
  return (
    <div className="subjects">
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

export default SubjectLinks;
