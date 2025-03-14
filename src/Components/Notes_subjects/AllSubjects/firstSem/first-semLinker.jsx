import React from "react";
import {Link} from "react-router-dom";
import '../../../../App.css';
import snscLogo from '../../../../assets/logo.png'
// const sem="firstSem"
const subjects = [
    {name:"C programming",path:"/AllSubjects/firstSem/CProgramming"},
    {name:"Digital Logic",path:"/AllSubjects/firstSem/digital-logic"},
    {name:"Introduction To Information And Technology",path:"/AllSubjects/firstSem/IntroductionToInformationTechnology"},
    {name:"Mathematics-I",path:"/AllSubjects/firstSem/Mathematics_I"},
    {name:"Physics",path:"/AllSubjects/firstSem/Physics"}
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
    
