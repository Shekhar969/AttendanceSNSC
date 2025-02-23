import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const Multimedia = () => {
  const subject = "Multimedia"; 
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

export default Multimedia;