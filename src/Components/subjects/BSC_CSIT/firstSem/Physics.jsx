import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const Physics = () => {
  const subject = "Physics"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData} 
        subject={subject} 
      />
    </main>
  );
}

export default Physics;
