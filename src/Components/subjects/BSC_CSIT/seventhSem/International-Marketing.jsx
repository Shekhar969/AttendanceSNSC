import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const InternationalMarketing = () => {
  const subject = "InternationalMarketing"; 
  const semester = "seventhSem";
  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.seventhSem} 
        subject={subject} 
        semester={semester}
      />
    </main>
  );
}

export default InternationalMarketing;