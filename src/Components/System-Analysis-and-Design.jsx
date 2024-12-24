import React from 'react'
import StudentsData from './student-details';
import { useAttendance, AttendancePage } from './attendanceHandler';

const SAD = () => {
  const { currentIndex, isPresent, isAbsent } = useAttendance(StudentsData);

  return (
    <main>
    <AttendancePage 
      StudentsData={StudentsData} 
      currentIndex={currentIndex} 
      isPresent={isPresent} 
      isAbsent={isAbsent}
    />
</main>
  )
}

export default SAD;