import { AttendancePage } from "../../../attendanceHandler";
import StudentsData from "../../../student-details";

const MathematicsI = () => {
  // const MathematicsI = "IntroductionToInformationTechnology";
  const subject = "MathematicsI"
  const semester = "firstSem";
  return (
    <main>
      <AttendancePage StudentsData={StudentsData.firstSem} 
      subject={subject}
      semester={semester}
       />
    </main>
  );
};

export default MathematicsI;
