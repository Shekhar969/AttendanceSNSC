import { AttendancePage } from "../../../attendanceHandler";
import StudentsData from "../../../student-details";

const IntroductionToInformationTechnology = () => {
  const subject = "IntroductionToInformationTechnology";
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

export default IntroductionToInformationTechnology;
