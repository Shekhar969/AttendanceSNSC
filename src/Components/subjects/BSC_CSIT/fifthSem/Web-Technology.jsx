import React from 'react'
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const WebTechnology = () => {
  const subject = "WebTechnology"; 
  const semester = "fifthSem";
  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.fifthSem} 
        subject={subject} 
        semester={semester}
      />
    </main>
  );
}

export default WebTechnology;