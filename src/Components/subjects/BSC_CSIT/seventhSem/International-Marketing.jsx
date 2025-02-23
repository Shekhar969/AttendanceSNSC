import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const InternationalMarketing = () => {
  const subject = "InternationalMarketing"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.seventhSem} 
        subject={subject} 
      />
    </main>
  );
}

export default InternationalMarketing;