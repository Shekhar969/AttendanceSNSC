import React from 'react'
import {Link} from "react-router-dom";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";

const subjects = [
    {name: "Advanced Java Programming",
    path:"/AllSubjects/seventhsSem/AdvancedJavaProgramming"
    },
    {
        name:"Database Administrator",
        path:"AllSubjects/seventhSem/DatabaseAdministrator",
    },
    {
        name:"International Marketing",
        path:"/AllSubjects/seventhSem/InternationalMarketing",
    },
    {
        name:"Project Work",
        path:"AllSubjects/seventhSem/ProjectWork",
    },
    {
        name:"Network Security",
        path:"AllSubjects/seventhSem/NetworkSecurity",
    }
];

const firstSemester= () =>{
    return(
        <div className="subjects">
            <img src={snscLogo}  className="snscLogo" alt="SNSC Logo" />
            <Link to="/AllSubjects">
            <button className="back-button subject">
                Back
            </button>
            </Link>
            {subjects.map((subject)=>(
                <Link 
                to={subject.path}
                key={subject.path}
                aria-label={`Go to ${subject.name} subject`}
                >
                    <div className="eachSubjectContainer">
                        <button className="subject eachsubject designs" data-id={subject.name}>
                            <h3>{subject.name}</h3>
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default firstSemester;