import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const NumericalMethod = () => {
  const subject = "NumericalMethod"; 
  const semester = "thirdSem";
  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.thirdSem} 
        subject={subject} 
        semester={semester}
      />
    </main>
  );
}

export default NumericalMethod;