import React from 'react'
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

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