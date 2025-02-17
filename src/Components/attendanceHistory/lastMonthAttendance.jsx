import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../../config/fireBase";
import { getDocs, collection } from "firebase/firestore";
import snscLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
function LastMonthAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false); 
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); 
  const fetchAttendanceData = async () => {
    try {
      const data = await getDocs(collection(db, "StudentAttendance"));
      const attendanceArray = data.docs.map((doc) => {
        const record = doc.data();
        return {
          id: doc.id,
          ...record,
          date: record.date?.toDate() || new Date(), 
        };
      });
      setAttendanceData(attendanceArray);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to fetch attendance data. Please try again later.");
      toast("fail to fetch Data")
    }
  };

  useEffect(() => {
    const filtered = attendanceData.filter((record) => {
      return (
        record.date.toDateString() === selectedDate.toDateString() 
      );
    });
    setFilteredData(filtered);
  }, [selectedDate, attendanceData]);

  useEffect(() => {
    fetchAttendanceData();
    setIsCalendarVisible(false);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true); 
     
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };

  return (
    <>
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to="/">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>

      <h1 className="attendanceRecordHeading">Attendance Records</h1>

      <div style={{ padding: "20px" }}>
        <h2 className="atendanceReordCalendarHeading">
          Select a Date{" "}
          <button onClick={toggleCalendarVisibility}>
            {isCalendarVisible ? "﹀" : "︿"}
          </button>
        </h2>

        {isCalendarVisible && (
          <Calendar className="calendar" onChange={handleDateChange} value={selectedDate} />
        )}

        {isDateSelected && <p className="atendanceReordCalendarHeading">Selected Date: {selectedDate.toDateString()}</p>}
      </div>
     <div className="records">

      

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredData.length === 0 ? (
        <p className="atendanceReordCalendarHeading">No attendance data found for the selected date.</p>
      ) : (
        filteredData.map((record, index) => (
         <div className="attendanceRecordMainDiv" key={index}>
          {/* <div className ="records"> */}
            <div>
              <h2 className="attendanceRecordSubjectName">
                Subject: {record.subject || "Unknown Subject"}
              </h2>
              <h2 className="attendanceRecordDate">
                Date: {record.date.toLocaleString()}
              </h2>
            </div>
            <div className="attendanceRecordInner">
              <div>
                <strong>Name & Roll No</strong> <br />
                {record.attendance.map((student, studentIndex) => (
                  <p
                    key={studentIndex}
                    className="attendanceRecordInnerEachStudent"
                  >
                    {student.name || "Unknown"}, {student.rollno || "Unknown"}
                  </p>
                ))}
              </div>
         

              <div>
                <strong>Status</strong>
                {record.attendance.map((student, studentIndex) => (
                  <p
                    key={studentIndex}
                    className="attendanceRecordInnerEachStudent"
                  >
                    {student.status || "Unknown"}
                  </p>
                ))}
              </div>
            </div>
            {/* </div> */}
            
          </div>
attendanceHandler
        ))
      )}
      <ToastContainer autoClose={2000} />
))
)}
</div>
    </>
  );
}

export default LastMonthAttendance;
