import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import snscLogo from "../assets/logo.png";
import "../App.css";
import { db } from "../config/fireBase";
import {  setDoc,  doc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";


export const useAttendance = (StudentsData, subject,semester) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState( StudentsData.map(() => ({ status: "Not Marked" })));
  const [showSummary, setShowSummary] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const dbDocId = `${subject} ~${new Date().toISOString().split("T")[0]}`;
  const navigate = useNavigate();

  const collectionName=`${semester}Attendance`
  const attendanceDocRef = doc(db, collectionName, dbDocId);


  useEffect(() => {
    const preloadImages = async () => {
      const promises = StudentsData.map((student) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = student.imgSrc;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
    };
    preloadImages();
  }, [StudentsData]);

  //Student list stay at center
  useEffect(() => {
    const highlightedElement = document.querySelector('.student-listitem.highlighted');
    if (highlightedElement) {
      highlightedElement.scrollIntoView({
        behavior: 'smooth', 
        block: 'center', 
      });
    }
  }, [currentIndex]);


  
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

  const sendDataToDatabase = async () => {
    const data = {
      subject,
      attendance: StudentsData.map((student, index) => ({
        name: student.name,
        rollno: student.rollno,
        status: attendanceStatus[index]?.status,
      })),
      date: Timestamp.now(),
    };

    try {
      setIsDataSubmitted(true);
      await setDoc(attendanceDocRef, data);
      console.log("Attendance data successfully sent to the database");
      toast("Attendance submitted successfully!");
      setTimeout(()=>{
        navigate(-1);
       },1000) 
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error(
        "There was an error submitting the attendance. Please try again.",
      );
      setTimeout(()=>{
      navigate(-1);
     },1000) 
    }
  };

  return {
    currentIndex,
    setCurrentIndex,
    isPresent,
    isAbsent,
    attendanceStatus,
    showSummary,
    resetAttendance,
    sendDataToDatabase,
    isDataSubmitted,
  };
};

export const AttendancePage = ({ StudentsData, subject ,semester }) => {
  const {
    currentIndex,
    setCurrentIndex,
    isPresent,
    isAbsent,
    attendanceStatus,
    showSummary,
    resetAttendance,
    sendDataToDatabase,
    isDataSubmitted,
  } = useAttendance(StudentsData, subject ,semester);

  const currentStudent = StudentsData[currentIndex];
  const isHighlighted = (index) => index === currentIndex;
  
  return (
    <div className="mainAttendancePage">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to={-1}>
        <button type="button" className="back-button">
          Back
        </button>
      </Link>

      {!showSummary && !isDataSubmitted && (
        <>
          <p className="subjectName">{subject}</p>
          <main className="particularSubject">
          <div className="student-list">
              <h1>Student Names</h1>
              <hr />
              {StudentsData.map((student, index) => (
                <div 
                  key={student.rollno} 
                  className={`student-listitem ${isHighlighted(index) ? 'highlighted' : ''}`}
                  onClick={() =>{ if (index < currentIndex) setCurrentIndex(index);} } 
                >
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
                  src={currentStudent?.imgSrc}
                  alt={currentStudent?.name}
                />
                <div className="student-details">
                  <p>
                    Name: <span>{currentStudent.name}</span>
                  </p>
                  <p>
                    Roll No: <span> {currentStudent.rollno}</span>
                  </p>
                  <p>
                    Address: <span>{currentStudent.address}</span>{" "}
                  </p>
                </div>
              </div>
              <button className="buttonAbs" onClick={isAbsent}>
                Absent
              </button>
              <button className="buttonPre" onClick={isPresent}>
                Present
              </button>
            </div>
          </main>
        </>
      )}

      {showSummary && !isDataSubmitted && (
        <div className="attendance-summary">
          <h2>Attendance Summary for {subject}</h2>
          {StudentsData?.map((student, index) => (
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
              onClick={sendDataToDatabase}
              disabled={isDataSubmitted}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isDataSubmitted && (
        <div className="attendance-summary">
          <h2>Attendance has been submitted sucessfully for {subject} for {new Date().toISOString().split("T")[0]} Now you can close the page</h2>
        </div>
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};
