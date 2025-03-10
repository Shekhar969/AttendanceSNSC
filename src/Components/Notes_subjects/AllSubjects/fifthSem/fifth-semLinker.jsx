import React from "react";
import {Link} from "react-router-dom";
import '../../../../App.css';
import snscLogo from '../../../../assets/logo.png'
// const sem="firstSem"
const subjects = [
    {name:"Cryptography",path:"/AllSubjects/fifthSem/Cryptography"},
    {name:"Design And Analysis Of Algorithm",path:"/AllSubjects/fifthSem/DesignAndAnalysisOfAlgorithm"},
    {name:"System Analysis And Design",path:"/AllSubjects/fifthSem/SystemAnalysisAndDesign"},
    {name:"Multimedia Computing",path:"/AllSubjects/fifthSem/Multimedia"},
    {name:"Web Technology",path:"/AllSubjects/fifthSem/WebTechnology"},
    {name:"Simulation And Modeling",path:"/AllSubjects/fifthSem/SimulationAndModeling"},

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
                        <button className="subject eachsubject" data-id={subject.name}>
                            <h3>{subject.name}</h3>
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default firstSemester;
    
