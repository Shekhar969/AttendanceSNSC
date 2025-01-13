import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { db } from "../config/fireBase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { format } from "date-fns";  // For date formatting

export const useAttendance = (StudentsData) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState(
    StudentsData.map(() => ({ status: "Not Marked" }))
  );
  const [showSummary, setShowSummary] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);  
  const attendanceCollectionRef = collection(db, "StudentAttendance");

  const todayDate = format(new Date(), "yyyy-MM-dd"); 


  const checkIfSubmitted = async (subject) => {
    const q = query(
      attendanceCollectionRef,
      where("subject", "==", subject),
      where("date", "==", todayDate)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const isPresent = () => {
    const updatedStatus = [...attendanceStatus];
    updatedStatus[currentIndex] = { status: "Present" };
    setAttendanceStatus(updatedStatus);

    if (currentIndex < StudentsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const isAbsent = () => {
    const updatedStatus = [...attendanceStatus];
    updatedStatus[currentIndex] = { status: "Absent" };
    setAttendanceStatus(updatedStatus);

    if (currentIndex < StudentsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const resetAttendance = () => {
    setAttendanceStatus(StudentsData.map(() => ({ status: "Not Marked" })));
    setCurrentIndex(0);
    setShowSummary(false);
  };

  const sendDataToDatabase = async (subject) => {
    const alreadySubmitted = await checkIfSubmitted(subject);
    if (alreadySubmitted) {
      alert("Attendance for this subject has already been submitted today.");
      return;  
    }

    const data = {
      subject,
      attendance: StudentsData.map((student, index) => ({
        name: student.name,
        rollno: student.rollno,
        status: attendanceStatus[index]?.status,
      })),
      date: todayDate,  
    };

    try {
     
      await addDoc(attendanceCollectionRef, data);
      console.log("Attendance data successfully sent to the database");
      alert("Attendance submitted successfully!");
      setIsDataSubmitted(true);  
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("There was an error submitting the attendance. Please try again.");
    }
  };

  return {
    currentIndex,
    isPresent,
    isAbsent,
    attendanceStatus,
    showSummary,
    resetAttendance,
    sendDataToDatabase,
    isDataSubmitted,  
  };
};

export const AttendancePage = ({ StudentsData, subject }) => {
  const {
    currentIndex,
    isPresent,
    isAbsent,
    attendanceStatus,
    showSummary,
    resetAttendance,
    sendDataToDatabase,
    isDataSubmitted,
  } = useAttendance(StudentsData);

  const currentStudent = StudentsData[currentIndex];

  return (
    <div className="mainAttendancePage">
      <Link to="/">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>

      {!showSummary && !isDataSubmitted && (
        <>
          <p className="subjectName">{subject}</p>
          <main className="particularSubject">
            <div className="student-list">
              {StudentsData.map((student, index) => (
                <div key={student.rollno} className="student-listitem">
                  <span className="student-name">
                    {index + 1}. {student.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="eachStudent">
              <span className="serial-number">{currentIndex + 1}. </span> <br />
              <div className="student-item">
                <img
                  className="student-photo"
                  src={currentStudent.imgSrc}
                  alt={currentStudent.name}
                />
                <div className="student-details">
                  <p>Name: {currentStudent.name}</p>
                  <p>Roll No: {currentStudent.rollno}</p>
                  <p>Address: {currentStudent.address}</p>
                </div>
              </div>
              <button className="buttonAbs" onClick={isAbsent}>
                Absent
              </button>
              <button className="buttonPre" onClick={isPresent}>
                Present
              </button>
            </div>
          </main>{" "}
        </>
      )}

      {showSummary && !isDataSubmitted && (
        <div className="attendance-summary">
          <h2>Attendance Summary for {subject}</h2>{" "}
          {/* Show subject in summary */}
          {StudentsData.map((student, index) => (
            <div key={student.rollno} className="attendance-item">
              <p>
                {index + 1}. {student.name} ( Roll No: {student.rollno} ) -{" "}
                <strong>{attendanceStatus[index]?.status}</strong>
              </p>
            </div>
          ))}
          <div className="summary-buttons">
            <button className="reset" onClick={resetAttendance}>
              Redo
            </button>
            <button
              className="send"
              onClick={() => sendDataToDatabase(subject)}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isDataSubmitted && (
        <div className="attendance-summary">
          <h2>Attendance has already been submitted for {subject} today.</h2>
        </div>
      )}
    </div>
  );
};
