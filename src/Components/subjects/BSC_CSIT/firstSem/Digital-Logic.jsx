import { AttendancePage } from '../../../attendanceHandler'; 
import StudentsData from '../../../student-details';

const DigitalLogic = () => {
  const subject = "DigitalLogic"; 
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

export default DigitalLogic;