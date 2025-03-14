import React from "react";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

const Simulation = () => {
    const chapters = [
        "Simulation Chapter 1.pdf",
        "Simulation Chapter 2.pdf",
        "Simulation Chapter 3.pdf",
        "Simulation Chapter 4.pdf",
        "Simulation Chapter 5.pdf",
        "Simulation Chapter 6.pdf"
    ];

    return (
        <div>
             <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
                         <Link to="/AllSubjects/fifthSem">
                             <button type="button" className="back-button , subject ">
                                  Back
                             </button>
                            </Link>
            <h2 className="notes-heading">Simulation Chapters</h2>
            {chapters.map((chapter, index) => {
                // Encode spaces properly in the filename for the URL
                const encodedChapter = encodeURIComponent(chapter)
                return (
                    <div key={index} className="pdf-container">
                        <a
                            href={`/fifthSemNotes/simulation-and-modeling/${encodedChapter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="each-pdf"
                        >
                            Simulation chapters{index + 1}
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default Simulation;
