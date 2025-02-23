import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const CProgramming = () => {
  const subject = "CProgramming"; 
  const semester = "firstSem";
  return (
    <main>
      <AttendancePage 
        StudentsData={StudentsData.firstSem} 
        subject={subject} 
        semester={semester}
      />
    </main>
  );
}

export default CProgramming;