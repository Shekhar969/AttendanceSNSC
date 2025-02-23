import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const AdvancedJavaProgramming = () => {
  const subject = "AdvancedJavaProgramming"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.seventhSem} 
        subject={subject} 
      />
    </main>
  );
}

export default AdvancedJavaProgramming;