import React from "react";
import "../../../../App.css";
import snscLogo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

const SystemAnalysisAndDesign = () => {
    const chapters = [
        "1.1 Definition of a System and Its Parts.pdf",
        "1.2 different approach.pdf",
        "1.3 Managing the information system project.pdf",
        "2.1 identifying and selecting project.pdf",
        "2.2 initiating and planning system.pdf",
        "3.1 determining system requirements.pdf",
        "3.2 structuring system requirements.pdf",
        "3.3 structuring system data requirements.pdf",
        "4.1 designing databases.pdf",
        "4.2 designing forms and reports.pdf",
        "4.3 designing interfaces and dialogues.pdf",
        "5.1 system implementation.pdf",
        "5.2 maintaining information system.pdf",
        "6.1 introduction to object oriented development.pdf"
    ];

    return (
        <div>
            <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
             <Link to="/AllSubjects/fifthSem">
                 <button type="button" className="back-button , subject ">
                      Back
                 </button>
                </Link>
            <h2 className="notes-heading">System Analysis And Design Chapters</h2>
            {chapters.map((chapter, index) => {
                // Encode spaces properly in the filename for the URL
                const encodedChapter = encodeURIComponent(chapter);

                return (
                    <div key={index} className="pdf-container">
                        <a
                            href={`/fifthSemNotes/SystemAnalysisAndDesign/${encodedChapter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                             className="each-pdf"
                        >
                            Chapter {chapter}
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default  SystemAnalysisAndDesign;
