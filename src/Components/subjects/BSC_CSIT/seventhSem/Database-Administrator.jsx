import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const DatabaseAdministrator = () => {
  const subject = "DatabaseAdministrator"; 
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

export default DatabaseAdministrator;