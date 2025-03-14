import React from "react";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";



const DesignAndAnalysisOfAlgorithm = () => {
    const chapters = [
        "DAA-unit-1.pdf",
        "DAA-unit-2.pdf",
        "DAA-unit-3.pdf",
        "DAA-unit-4.pdf",
        "DAA-unit-5.pdf",
        "DAA-unit-6.pdf",
        "DAA-unit-7.pdf",
        "DAA-unit-8.pdf",
    ];

    return (
        <div >
             <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
                 <Link to="/AllSubjects/fifthSem">
                    <button type="button" className="back-button , subject ">
                      Back
                    </button>
                  </Link>
            
            <h2 className="notes-heading"> Design And Analysis Of Algorithm Chapters</h2>
            {chapters.map((chapter, index) => {
                return (
                    <div key={index} className="pdf-container">
                        <a
                            href={`/fifthSemNotes/DesignAndAnalysisOfAlgorithms/${chapter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="each-pdf"
                        >
                            Design And Analysis Of Algorithm chapters {index + 1}
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default DesignAndAnalysisOfAlgorithm;
