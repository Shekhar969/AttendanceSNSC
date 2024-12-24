import React, { createElement } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "../App.css"

export const useAttendance = (StudentsData) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function lastStudent() {
    const popup = document.createElement('div');
    popup.textContent = "It's the last student!";
    popup.className = 'popup-message';
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.remove();
    }, 3000); 
  }
  
  const isPresent = () => {
    if (currentIndex < StudentsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      lastStudent();
      setTimeout(()=>{
        setCurrentIndex(0); 
      },3000)
    }
  };

  const isAbsent = () => {
    if (currentIndex < StudentsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  return { currentIndex, isPresent, isAbsent };
};

export const AttendancePage = ({ StudentsData, currentIndex, isPresent, isAbsent }) => {
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
              <span className="student-name">{index + 1}.{student.name}</span>
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
    </div>
  );
};
