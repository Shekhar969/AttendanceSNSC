// Parent Component (e.g., Cryptography.js)
import React from 'react';
import { AttendancePage } from '../attendanceHandler'; 
import StudentsData from '../student-details';

const Cryptography = () => {
  const subject = "Cryptography"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData} 
        subject={subject} 
      />
    </main>
  );
}

export default Cryptography;
