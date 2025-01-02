import React from 'react'
import StudentsData from './student-details';
import { useAttendance, AttendancePage } from './attendanceHandler';

const SM = () => {
  const subject = "Simulation and Modeling"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData} 
        subject={subject} 
      />
    </main>
  );
}

export default SM;