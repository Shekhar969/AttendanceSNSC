import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

export const useAttendance = (StudentsData) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState(
    StudentsData.map(() => ({ status: 'Not Marked' }))
  );
  const [showSummary, setShowSummary] = useState(false);

  function lastStudent() {
    const popup = document.createElement('div');
    popup.textContent = "Attendance Completed";
    popup.className = 'popup-message';
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 1000);

    setShowSummary(true);
  }

  const isPresent = () => {
    const updatedStatus = [...attendanceStatus];
    updatedStatus[currentIndex] = { status: 'Present' };
    setAttendanceStatus(updatedStatus);

    if (currentIndex < StudentsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      lastStudent();
    }
  };

  const isAbsent = () => {
    const updatedStatus = [...attendanceStatus];
    updatedStatus[currentIndex] = { status: 'Absent' };
    setAttendanceStatus(updatedStatus);

    if (currentIndex < StudentsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      lastStudent();
    }
  };

  return { currentIndex, isPresent, isAbsent, attendanceStatus, showSummary };
};

export const AttendancePage = ({ StudentsData }) => {
  const { currentIndex, isPresent, isAbsent, attendanceStatus, showSummary } = useAttendance(StudentsData);
  const currentStudent = StudentsData[currentIndex];

  return (
    <div className="mainAttendancePage">
      <Link to="/">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>
      <main className="particularSubject">
        <div className="student-list">
          {StudentsData.map((student, index) => (
            <div key={student.rollno} className="student-item">
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
      </main>

      {showSummary && (
        <div className="attendance-summary">
          <h2>Attendance Summary</h2>
          {StudentsData.map((student, index) => (
            <div key={student.rollno} className="attendance-item">
              <p>
                {index + 1}. {student.name} ( Roll No: {student.rollno} ) -{' '}
                <strong>{attendanceStatus[index]?.status}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
