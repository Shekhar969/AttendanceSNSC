import React from "react";
import StudentsData from "../student-details";
import { useAttendance, AttendancePage } from "../attendanceHandler";

const DAA = () => {
  const subject = "Design and Analysis of Algorithms";

  return (
    <main>
      <AttendancePage StudentsData={StudentsData} subject={subject} />
      <ToastContainer autoClose={2000}/>
    </main>
  );
};

export default DAA;
