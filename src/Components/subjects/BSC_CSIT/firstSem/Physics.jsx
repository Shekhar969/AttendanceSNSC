import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const Physics = () => {
  const subject = "Physics"; 
  const semester = "firstSem";
  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.firstSem} 
        subject={subject} 
        semester={semester}
      />
    </main>
  );
}

export default Physics;
