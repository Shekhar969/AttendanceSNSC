import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const ProjectWork = () => {
  const subject = "ProjectWork"; 

  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.seventhSem} 
        subject={subject} 
      />
    </main>
  );
}

export default ProjectWork;