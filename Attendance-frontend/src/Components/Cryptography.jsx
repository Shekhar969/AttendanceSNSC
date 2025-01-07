// import React from 'react'
// import StudentsData from './student-details';
// import { useAttendance, AttendancePage } from './attendanceHandler';

// const Cryptography = () => {
//   const { currentIndex, isPresent, isAbsent } = useAttendance(StudentsData);

//   return (
//     <main>
//     <AttendancePage 
//       StudentsData={StudentsData} 
//       currentIndex={currentIndex} 
//       isPresent={isPresent} 
//       isAbsent={isAbsent}
//     />
// </main>
//   )
// }

 import React, { useState, useEffect } from 'react';
 import "../App.css"
 import { Link } from 'react-router-dom';


function Cryptography() {
  const [attendanceData, setAttendanceData] = useState([]); // State to hold attendance data
  const [currentIndex,setCurrentIndex] = useState(0);
  const [currentDay,setCurrentDay] = useState("Day 1");

  useEffect(() => {
    // Fetch attendance data for Cryptography subject
      fetch('http://localhost:5000/api/attendance') // Backend API for Cryptography subject
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setAttendanceData(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error); // Log errors
      });
  }, []); // Empty dependency array ensures this runs only once


  

  //function to send attendance status to the backend
  const markAttendance = (status) => {
    const currentStudent = attendanceData[currentIndex];
    if (!currentStudent) return;

    //data to send to the backend
    const data = {
      SN: currentStudent.SN,
      RollNo: currentStudent.RollNo,
      status:status,
      day: currentDay,
    };
    console.log('Sending data:',data);

    //send a POST reuest to the backend 
    fetch('http://localhost:5000/api/attendance/update',{
      method:'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(data), 
    })

    .then((response) => response.json())
    .then((result)=>{
      console.log(result.message);
      goToNextStudent();
    })
    .catch((error)=>{
      console.error('Error updating attendance:',error);
    });
  };

  const goToNextStudent = () => {
    if (currentIndex < attendanceData.length -1){
      setCurrentIndex(currentIndex + 1);
    }else {
      alert("All students have been marked!");


      setCurrentDay((prevDay) => {
        const nextDayNumber = parseInt(prevDay.replace('day','')) + 1;
        return nextDayNumber <= 30 ? `Day ${nextDayNumber}` : prevDay;
      });

    }
  };
  const currentStudent = attendanceData[currentIndex];

return(

  <div className="mainAttendacePage"> 
    < Link to ="/">
      <button type="button" className="back-button">
      Back
      </button>
    </Link>  
      <main className="particularSubject">
    <div className = "student-list">
     {attendanceData.length > 0 && (
      <div >
        {attendanceData.map((record,index)=>(
          <div className="student-item" key = {index}>
            <p className="student-name">{record.SN}. {record.Name}</p>         
          </div>
        ))}

      </div>
     )}
     {attendanceData.length === 0 && (
      <p>No attendance records found for Cryptography.</p>
     )}
    </div>
      

    <div className="eachStudent">
      {currentStudent ? (
        <div>
          <p className="serial-number">{currentStudent.SN}.</p>
          <div className="student-iten">
           <img
              className="student-photo"
              src={currentStudent.imgSrc}
              alt={currentStudent.name}
            />

           <div className="student-details">
           <p><strong>Name:</strong> {currentStudent.Name}</p>
           <p><strong>RollNo:</strong>{currentStudent.RollNo}</p>
           <p><strong>Address:</strong>{currentStudent.Address}</p>
           </div>
          </div>

          <button onClick={() => markAttendance('Present')} className = "buttonAbs">Present</button>
          <button onClick={() => markAttendance('Absent')} className = "buttonPre">Absent</button>
        </div>
      ) :(
        <p>No more students.</p>
      )
      }
    </div>
    </main>
    </div>
     


     
);
}
export default Cryptography;


  




