import React from 'react'
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const SM = () => {
  const subject = "Simulation and Modeling"; 
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

export default SM;