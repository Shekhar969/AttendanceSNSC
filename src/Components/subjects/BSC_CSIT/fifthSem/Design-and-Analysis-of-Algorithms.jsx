import React from "react";
import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const DAA = () => {
  const subject = "Design and Analysis of Algorithms";

  return (
    <main>
      <AttendancePage StudentsData={StudentsData} subject={subject} />
    </main>
  );
};

export default DAA;
