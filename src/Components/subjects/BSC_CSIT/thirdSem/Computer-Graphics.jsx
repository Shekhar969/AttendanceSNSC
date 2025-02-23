import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const ComputerGraphics = () => {
  const subject = "ComputerGraphics"; 
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

export default ComputerGraphics;