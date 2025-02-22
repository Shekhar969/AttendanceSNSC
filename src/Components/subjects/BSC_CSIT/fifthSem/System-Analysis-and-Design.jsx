import React from 'react'
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

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