import React from 'react'
import { Link } from 'react-router-dom'
import StudentsData from './student-details';
import { useAttendance, AttendancePage } from './attendanceHandler';

const Cryptography = () => {
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

export default Cryptography