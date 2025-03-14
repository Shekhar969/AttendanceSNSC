
import React from "react";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";


const Crypto = () => {
    return (
        <div >
                <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
                             <Link to="/AllSubjects/fifthSem">
                                <button type="button" className="back-button , subject ">
                                  Back
                                </button>
                              </Link>
             <h2 className="notes-heading"> Cryptography</h2>
          <div className="pdf-container">

            <a href="/fifthSemNotes/cryptography.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="each-pdf"
            >
                 Cryptography Notes by Tej Shahi
            </a>
           </div>

        </div>
    );
};

export default Crypto;
