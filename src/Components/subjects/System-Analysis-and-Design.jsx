import React from 'react'
import StudentsData from '../student-details';
import { useAttendance, AttendancePage } from '../attendanceHandler';

const SAD = () => {
  const subject = "System Analysis and Design"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData} 
        subject={subject} 
      />
    </main>
  );
}

export default SAD;