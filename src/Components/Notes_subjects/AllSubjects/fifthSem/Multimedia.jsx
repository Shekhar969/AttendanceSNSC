import React from "react";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";


const Multimedia = () => {
    const chapters = [
        "multimedia-unit-1.pdf",
        "multimedia-unit-2.pdf",
        "multimedia-unit-3.pdf",
        "multimedia-unit-4.pdf",
        "multimedia-unit-5.pdf",
        "multimedia-unit-6.pdf",
        "multimedia-unit-7.pdf",
        "multimedia-unit-8.pdf",
    ];

    return (
        <div>
             <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
                             <Link to="/AllSubjects/fifthSem">
                                <button type="button" className="back-button , subject ">
                                  Back
                                </button>
                              </Link>
            <h2 className="notes-heading"> Multimedia Chapters</h2>
            {chapters.map((chapter, index) => {
                return (
                    <div key={index} className="pdf-container">
                        <a
                            href={`/fifthSemNotes/MultimediaComputing/${chapter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="each-pdf"
                        >
                            Multimedia chapters{index + 1}
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default Multimedia;
