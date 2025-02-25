import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../../../App.css";
import { db } from "../../../config/fireBase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const AssignmentHandler = () => {

  const location = useLocation();
  const subject = location.state?.subject || "Unknown Subject";

  const [message, setMessage] = useState("");
  const dbDocId = `${subject} ~${new Date().toISOString().split("T")[0]}`;
  const collectionName = `${subject} Assignment`;
  const AssignmentDocRef = doc(db, collectionName, dbDocId);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const data = { message };
    try {
      await setDoc(AssignmentDocRef, data);
      console.log("Assignment successfully sent to database");
      toast("Assignment Submission Successful");
      setMessage("");
    } catch (error) {
      console.error("Error Submitting Assignment", error);
      toast("Error Submitting Assignment");
    }
  };

  return (
    <div className="assignment-handler">
      <Link to="/Bsc_Csit">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>
      <h2>Assignment for {subject}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your assignment message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="10"
          cols="50"
        />
        <br />
        <button type="submit">Submit Assignment</button>
      </form>
    </div>
  );
};

export default AssignmentHandler;
