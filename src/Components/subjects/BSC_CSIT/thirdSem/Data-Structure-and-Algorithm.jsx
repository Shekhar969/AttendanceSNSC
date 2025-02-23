import React from 'react';
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const DataStructureandAlgorithm = () => {
  const subject = "DataStructureandAlgorithm"; 
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

export default DataStructureandAlgorithm;