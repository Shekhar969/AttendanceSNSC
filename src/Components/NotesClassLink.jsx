import React from "react";
import {Link} from "react-router-dom";
import "../App.css";
import snscLogo from '../assets/logo.png'


function noteLinks() {
    return(
        <>
        <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
        <Link to="/">
        <button type="button" className="back-button  subject">
            Back
        </button>
        </Link>
        <div className="subjects">
            <Link to='/AllSubjects/firstSem'>
            <button className="subject">
               <h3>1st Sem</h3> 
            </button>
            </Link>
            <Link to="/AllSubjects/thirdSem">
            <button className="subject">
                <h3>3rd Sem</h3>
            </button>

            </Link>
            <Link to="/AllSubjects/fifthSem">
            <button className="subject">
                <h3>5th Sem</h3>
            </button>
            </Link>
            <Link to="/AllSubjects/seventhSem">
            <button className="subject">
                <h3>7th Sem</h3>
            </button>
            </Link>

        </div>
       
        </>
    )
}
export default noteLinks;