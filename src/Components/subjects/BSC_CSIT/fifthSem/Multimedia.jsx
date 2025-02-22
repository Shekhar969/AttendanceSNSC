import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const Multimedia = () => {
  const subject = "Multimedia"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData} 
        subject={subject} 
      />
    </main>
  );
}

export default Multimedia;