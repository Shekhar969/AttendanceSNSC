import React from 'react'
import { Link } from 'react-router-dom'
import StudentsData from "./student-details"
import { useState } from 'react'

  const SM = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const Attendance ="";
    const currentStudent = StudentsData[currentIndex];
  
    const isPresent = () => {
      if (currentIndex < StudentsData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        Attendance =true;
      } else {
        setCurrentIndex(0); 
      }
    };
    const isAbsent = () => {
      if (currentIndex < StudentsData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        Attendance =false;
      } else {
        setCurrentIndex(0); 
      }
    };
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
              <span className="student-name">{index + 1}. {student.name}</span> 
            </div>
          ))}
        </div>
        <div className="eachStudent">
        
          <span className="serial-number">{currentIndex + 1}. </span> <br />
        
        <div className="student-item">
          <img
              className="student-photo"
              src={StudentsData[currentIndex].imgSrc}
              alt={StudentsData[currentIndex].name}
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

  )
}

export default SM