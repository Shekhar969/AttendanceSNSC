import React from 'react'
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const WebTechnology = () => {
  const subject = "WebTechnology"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData} 
        subject={subject} 
      />
    </main>
  );
}

export default WebTechnology;