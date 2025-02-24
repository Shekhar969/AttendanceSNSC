import React from 'react'
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const SAD = () => {
  const subject = "System Analysis and Design"; 
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

export default SAD;