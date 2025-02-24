import React from "react";
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const DAA = () => {
  const subject = "Design and Analysis of Algorithms";
  const semester = "fifthSem";
  return (
    <main>
      <AttendancePage StudentsData={StudentsData.fifthSem} 
      subject={subject}
      semester={semester} />
    </main>
  );
};

export default DAA;
