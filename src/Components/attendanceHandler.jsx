import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import snscLogo from "../assets/logo.png";
import "../App.css";
import { db } from "../config/fireBase";
import { addDoc,setDoc, collection,doc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
export const useAttendance = (StudentsData, subject) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState(
    StudentsData.map(() => ({ status: "Not Marked" }))
  );
  const [showSummary, setShowSummary] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const dbDocId = `${subject} ~${new Date().toISOString().split("T")[0]}`;

  const attendanceDocRef = doc(db, "StudentAttendance", dbDocId); 

  useEffect(() => {
    const storedData = localStorage.getItem(`attendanceSubmitted_${subject}`);
    if (storedData === "true") {
      setIsDataSubmitted(true);
    }
  }, [subject]);

  const localClear = () => {
    localStorage.removeItem(`attendanceSubmitted_${subject}`);
   setTimeout(()=>{
    window.location.reload();
   },500) 
    console.log('Attendance data cleared from localStorage');
    toast("Attendance data cleared from localStorage")
  };

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
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, [StudentsData]);
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
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error(
        "There was an error submitting the attendance. Please try again."
      );
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
    localClear
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
    localClear
  } = useAttendance(StudentsData, subject);

  const currentStudent = StudentsData[currentIndex];

  return (
    <div className="mainAttendancePage">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to="/Subjects">
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
                  src={currentStudent?.imgSrc}
                  alt={currentStudent?.name}
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
            <button className="send" onClick={sendDataToDatabase} disabled={isDataSubmitted}>
              Submit
            </button>
          </div>
        </div>
      )}

      {isDataSubmitted && (
        <div className="attendance-summary">
          <h2>Attendance has already been submitted for {subject} today.</h2>
<button onClick={localClear} >Clear local</button>
        </div>
      )}


      <ToastContainer autoClose={2000}  />
    </div>
  );
};
