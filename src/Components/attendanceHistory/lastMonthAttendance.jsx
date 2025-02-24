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

  const downloadAttendanceExcel = async (selectedSemesters) => {
    try {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      const semesters = selectedSemesters.split(","); 
      let allAttendanceData = [];

      for (const semester of semesters) {
        const attendanceQuery = query(
          collection(db, semester),
          where("date", ">=", Timestamp.fromDate(thirtyDaysAgo)),
          where("date", "<=", Timestamp.fromDate(today))
        );

        const querySnapshot = await getDocs(attendanceQuery);
        if (!querySnapshot.empty) {
          const semesterData = querySnapshot.docs.flatMap((doc) =>
            doc.data().attendance.map((student) => ({
              Subject: doc.data().subject,
              Roll_No: student.rollno,
              Name: student.name,
              Status: student.status,
              Date: doc.data().date.toDate().toLocaleDateString(),
            }))
          );
          allAttendanceData = [...allAttendanceData, ...semesterData];
        }
      }

      if (allAttendanceData.length === 0) {
        return toast.warn("No attendance data found for the last 30 days.");
      }

      // Generate and download Excel file
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(allAttendanceData), "Attendance");
      saveAs(
        new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `Attendance_Report_${thirtyDaysAgo.toLocaleDateString()}-${today.toLocaleDateString()}.xlsx`
      );

      toast.success("Attendance report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading attendance:", error);
      toast.error("Failed to download attendance report.");
    }
  };


function LastMonthAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const navigate = useNavigate();

  // const fetchAttendanceData = async () => {
  //   try {
  //     const fetchingAllAttendance={"StudentAttendance","firstSemAttendance"}
  //     const data = await getDocs(collection(db, fetchingAllAttendance));
  //     const attendanceArray = data.docs.map((doc) => {
  //       const record = doc.data();
  //       return {
  //         id: doc.id,
  //         ...record,
  //         date: record.date?.toDate() || new Date(),
  //       };
  //     });
  //     setAttendanceData(attendanceArray);
  //   } catch (error) {
  //     console.error("Error fetching attendance data:", error);
  //     setError("Failed to fetch attendance data. Please try again later.");
  //     // alert("Not Logged in! Authenticate Yourself.");
  //     toast.error(`Not Logged in! Authenticate Yourself.`);

  //     setTimeout(() => {
  //       navigate("/auth");
  //     }, 1500);
  //   }
  // };
  const fetchAttendanceData = async () => {
    try {
      const collectionNames = [
        "firstSemAttendance",
        "thirdSemAttendance", 
        "fifthSemAttendance",
        "seventhSemAttendance"
      ];
  
      const results = await Promise.all(
        collectionNames.map(async (collectionName) => {
          try {
            const snapshot = await getDocs(collection(db, collectionName));
            return snapshot.docs.map((doc) => ({
              id: doc.id,
              collection: collectionName,
              ...doc.data(),
              date: doc.data().date?.toDate?.() || new Date(),
              attendance: doc.data().attendance || []
            }));
          } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
            return [];
          }
        })
      );
  
      const combinedData = results
        .flat()
        .filter(record => record.attendance.length > 0);
  
      setAttendanceData(combinedData);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance records");
    } finally {
      
    }
  };
  useEffect(() => {
    const filtered = attendanceData.filter((record) => {
      const recordDate = record.date instanceof Date ? record.date : new Date(record.date);
      return recordDate.toDateString() === selectedDate.toDateString();
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

    const [showOptions, setShowOptions] = useState(false);


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
        <div className="downloadAttendance">
      <button onClick={() => setShowOptions(!showOptions)} className="downloadAttendanceLastMonthBtn">
        Download Attendance
      </button>
      {showOptions && (
        <ul >
          <li onClick={() => downloadAttendanceExcel("firstSemAttendance,thirdSemAttendance,fifthSemAttendance,seventhSemAttendance")} >All Semesters</li>
          <li onClick={() => downloadAttendanceExcel("firstSemAttendance")}>First Semester</li>
          <li onClick={() => downloadAttendanceExcel("thirdSemAttendance")}>Third Semester</li>
          <li onClick={() => downloadAttendanceExcel("fifthSemAttendance")}>Fifth Semester</li>
          <li onClick={() => downloadAttendanceExcel("seventhSemAttendance")}>Seventh Semester</li>
        </ul>
      )}
    </div>
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
              <div className="attendanceRecordSubjectNameDate">
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
                        className={
                          student.status === "Present" ? "present" : "absent"
                        }
                      >
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
