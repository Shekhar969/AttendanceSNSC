import React from 'react'
import StudentsData from './student-details';
import { useAttendance, AttendancePage } from './attendanceHandler';

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