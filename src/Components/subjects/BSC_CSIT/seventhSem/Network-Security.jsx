import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const NetworkSecurity = () => {
  const subject = "NetworkSecurity"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.seventhSem} 
        subject={subject} 
      />
    </main>
  );
}

export default NetworkSecurity;