import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { db } from "../../config/fireBase";
import { getDocs, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "../attendanceHistory/attendanceColour.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Timestamp, query, where } from "firebase/firestore";
import { IoMdDownload } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const downloadAttendanceExcel = async (selectedSemesters) => {
  try {
    if (Array.isArray(selectedSemesters)) {
      selectedSemesters = selectedSemesters.join(",");
    }
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
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(allAttendanceData),
      "Attendance"
    );
    saveAs(
      new Blob(
        [
          XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          }),
        ],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      ),
      `Attendance_Report_${thirtyDaysAgo.toLocaleDateString()}-${today.toLocaleDateString()}.xlsx`
    );
    toast.success("Attendance report downloaded successfully!");
  } catch (error) {
    console.error("Error downloading attendance:", error);
    toast.error("Failed to download attendance report.");
  }
};

const downloadAttendanceExcelSummary = async (selectedSemesters) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const semesters = selectedSemesters;
    let allAttendanceData = [];
    let includeFullAttendance = semesters.length > 1;
    for (const semester of semesters) {
      const attendanceQuery = query(
        collection(db, semester),
        where("date", ">=", Timestamp.fromDate(thirtyDaysAgo)),
        where("date", "<=", Timestamp.fromDate(today))
      );
      const querySnapshot = await getDocs(attendanceQuery);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.attendance.forEach((student) => {
          allAttendanceData.push({
            Subject: data.subject,
            Roll_No: student.rollno,
            Name: student.name,
            Status: student.status,
            Date: data.date.toDate().toLocaleDateString(),
          });
        });
      });
    }
    if (allAttendanceData.length === 0) {
      return toast.warn("No attendance data found for the last 30 days.");
    }
    const groupedData = allAttendanceData.reduce((acc, row) => {
      const subject = row.Subject;
      if (!acc[subject]) {
        acc[subject] = { attendance: [], summary: {} };
      }
      acc[subject].attendance.push(row);
      const name = row.Name;
      if (!acc[subject].summary[name]) {
        acc[subject].summary[name] = {
          rollNo: row.Roll_No,
          totalDays: 0,
          presentDays: 0,
          average: 0,
        };
      }
      acc[subject].summary[name].totalDays += 1;
      if (row.Status === "Present") {
        acc[subject].summary[name].presentDays += 1;
      }
      acc[subject].summary[name].average =
        (acc[subject].summary[name].presentDays /
          acc[subject].summary[name].totalDays) *
        100;
      return acc;
    }, {});
    let excelData = [];
    Object.entries(groupedData).forEach(
      ([subject, { attendance, summary }]) => {
        excelData.push({ Subject: subject });
        excelData.push({
          Name: "Name",
          Roll_No: "Roll_No",
          TotalDays: "TotalDays",
          PresentDays: "PresentDays",
          Average: "Average (%)",
        });
        Object.entries(summary).forEach(([name, data]) => {
          excelData.push({
            Name: name,
            Roll_No: data.rollNo,
            TotalDays: data.totalDays,
            PresentDays: data.presentDays,
            Average: `${data.average}%`,
          });
        });
        excelData.push({});
        if (includeFullAttendance) {
          excelData.push({
            Name: "Name",
            Roll_No: "Roll_No",
            Status: "Status",
            Date: "Date",
          });
          attendance.forEach((row) => {
            excelData.push({
              Name: row.Name,
              Roll_No: row.Roll_No,
              Status: row.Status,
              Date: row.Date,
            });
          });
          excelData.push({});
        }
      }
    );
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData, { skipHeader: true });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(
      fileBlob,
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
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSemLabel, setSelectedSemLabel] = useState("Choose Sem");
  const navigate = useNavigate();

  const semesters = [
    { label: "First Semester", value: "firstSemAttendance" },
    { label: "Third Semester", value: "thirdSemAttendance" },
    { label: "Fifth Semester", value: "fifthSemAttendance" },
    { label: "Seventh Semester", value: "seventhSemAttendance" },
  ];

  const fetchAttendanceData = async (selectedCollections) => {
    try {
      const collectionNames = selectedCollections || [
        "firstSemAttendance",
        "thirdSemAttendance",
        "fifthSemAttendance",
        "seventhSemAttendance",
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
              attendance: doc.data().attendance || [],
            }));
          } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
            return [];
          }
        })
      );
      const combinedData = results
        .flat()
        .filter((record) => record.attendance.length > 0);
      setAttendanceData(combinedData);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to load attendance records");
      toast("LogIn To See Attendance");
      setTimeout(() => {
        navigate("/auth");
      }, 1500);
    }
  };

  useEffect(() => {
    const filtered = attendanceData.filter((record) => {
      const recordDate =
        record.date instanceof Date ? record.date : new Date(record.date);
      return recordDate.toDateString() === selectedDate.toDateString();
    });
    setFilteredData(filtered);
  }, [selectedDate, attendanceData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDateSelected(true);
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible((prevState) => !prevState);
  };


  const handleSemesterSelection = (selectedValues, label) => {
    fetchAttendanceData(selectedValues);
    setSelectedSemLabel(label);
    setShowOptions(false);
  };

  return (
    <>
      <Link to="/">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>
      <h1 className="attendanceRecordHeading">Attendance Records</h1>
      <div className="attendanceRecordsHandlerSection">
        <div className="particularSemRecordFetch">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="downloadAttendanceLastMonthBtn"
          >
            {selectedSemLabel} {!showOptions ? <FaAngleDown /> : <FaAngleUp />}
          </button>
          {showOptions && (
            <ul>
              <li
                onClick={() =>
                  handleSemesterSelection(
                    semesters.map((s) => s.value),
                    "All Semesters"
                  )
                }
              >
                All Semesters
                <div
                  className="downloadPaticularSem"
                  onClick={() =>
                    downloadAttendanceExcel(
                      "firstSemAttendance,thirdSemAttendance,fifthSemAttendance,seventhSemAttendance"
                    )
                  }
                >
                  <IoMdDownload />
                </div>
              </li>
              {semesters.map(({ label, value }) => (
                <li
                  key={value}
                  onClick={() => handleSemesterSelection([value], label)}
                >
                  {label}
                  <div
                    className="downloadPaticularSem"
                    onClick={() => downloadAttendanceExcelSummary([value])}
                  >
                    <IoMdDownload />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button onClick={toggleCalendarVisibility}>
            <MdCalendarMonth />
          </button>
        </div>
      </div>
      <div className="calanderHandeler">
        {isCalendarVisible && (
          <Calendar
            className="calendar"
            onChange={handleDateChange}
            value={selectedDate}
          />
        )}
      </div>
      {isDateSelected && (
        <p className="atendanceReordCalendarHeading">
          Selected Date: {selectedDate.toDateString()}
        </p>
      )}
      <div className="records">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {filteredData.length === 0 ? (
          <p className="atendanceReordCalendarHeading">
            No attendance data found for this date
          </p>
        ) : (
          filteredData.map((record, index) => (
            <div className="attendanceRecordMainDiv" key={index}>
              <div className="attendanceRecordSubjectNameDate">
                <h2 className="attendanceRecordSubjectName">
                  Subject: {record.subject || "Unknown Subject"}
                </h2>
                <h2 className="attendanceRecordDate">
                  Date: {record.date.toLocaleString()}
                </h2>
              </div>
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
