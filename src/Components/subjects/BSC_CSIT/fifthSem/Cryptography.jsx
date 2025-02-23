// Parent Component (e.g., Cryptography.js)
import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';
const Cryptography = () => {
  const subject = "Cryptography"; 
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

export default Cryptography;
