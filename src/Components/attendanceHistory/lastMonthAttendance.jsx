import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../../config/fireBase";
import { getDocs, collection } from "firebase/firestore";
import snscLogo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "../attendanceHistory/attendanceColour.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Timestamp, query, where } from "firebase/firestore";

const downloadAttendanceExcel = async () => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Convert to Firebase Timestamp format
  const startTimestamp = Timestamp.fromDate(thirtyDaysAgo);
  const endTimestamp = Timestamp.fromDate(today);

  // Query attendance data for the last 30 days
  const attendanceQuery = query(
    collection(db, "StudentAttendance"),
    where("date", ">=", startTimestamp),
    where("date", "<=", endTimestamp)
  );

  const querySnapshot = await getDocs(attendanceQuery);

  if (querySnapshot.empty) {
    toast.warn("No attendance data found for the last 30 days.");
    return;
  }

  // Prepare Data for Excel
  const attendanceArray = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.attendance.forEach((student) => {
      attendanceArray.push({
        Subject: data.subject,
        Roll_No: student.rollno,
        Name: student.name,
        Status: student.status,
        Date: data.date.toDate().toLocaleDateString(),
      });
    });
  });

  // Convert to Excel format
  const worksheet = XLSX.utils.json_to_sheet(attendanceArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

  // Create a Blob and download the file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(
    data,
    `Attendance_Report_BSC_CSIT_5thSem${thirtyDaysAgo.toLocaleDateString()}-${today.toLocaleDateString()}.xlsx`
  );
};

function LastMonthAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const navigate = useNavigate();

  
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
      // alert("Not Logged in! Authenticate Yourself.");
      toast.error(`Not Logged in! Authenticate Yourself.`);

      setTimeout(() => {
        navigate("/auth");
      }, 1500);
    }
  };

  useEffect(() => {
    const filtered = attendanceData.filter((record) => {
      return record.date.toDateString() === selectedDate.toDateString();
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
            {isCalendarVisible ? "︿" : "﹀"}
          </button>
          <button
            onClick={downloadAttendanceExcel}
            className="downloadAttendanceLastMonthBtn"
          >
            Download Attendance
          </button>
        </h2>
        {isCalendarVisible && (
          <Calendar
            className="calendar"
            onChange={handleDateChange}
            value={selectedDate}
          />
        )}

        {isDateSelected && (
          <p className="atendanceReordCalendarHeading">
            Selected Date: {selectedDate.toDateString()}
          </p>
        )}
      </div>
      <div className="records">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {filteredData.length === 0 ? (
          <p className="atendanceReordCalendarHeading">
            No attendance data found for this date
          </p>
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

              {/* table */}
              <div className="attendanceRecordInner data-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll no.</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record?.attendance.map((student, studentIndex) => (
                      <tr
                        key={studentIndex}
                        className={student.status === "Present" ? "present" : "absent" } >
                        <td>{student.name || "Unknown"}</td>
                        <td>{student.rollno || "Unknown"}</td>
                        <td>{student.status || "Unknown"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}

export default LastMonthAttendance;
