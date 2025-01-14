import React, { useEffect, useState } from "react";
import { db } from "../../config/fireBase";
import { getDocs, collection } from "firebase/firestore";
import snscLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function LastMonthAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAttendanceData = async () => {
    try {
      const data = await getDocs(collection(db, "StudentAttendance"));
      const attendanceArray = data.docs.map((doc) => {
        const record = doc.data();
        return {
          id: doc.id,
          ...record,
          date: record.date?.toDate().toLocaleString() || "Unknown Date", // Convert Firestore Timestamp
        };
      });
      setAttendanceData(attendanceArray);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to fetch attendance data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to="/">
        <button type="button" className="back-button">
          Back
        </button>
      </Link>

      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Attendance Records
      </h1>

      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : attendanceData.length === 0 ? (
        <p style={{ textAlign: "center" }}>No attendance data found.</p>
      ) : (
        attendanceData.map((record) => (
          <div
            key={record.id}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>
              <strong>Date:</strong> {record.date}
            </h2>
            <h3 style={{ marginBottom: "10px" }}>
              <strong>Subject:</strong> {record.subject || "Unknown Subject"}
            </h3>
            {record.attendance.map((student, index) => (
              <div
                key={index}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong>Name:</strong> {student.name || "Unknown"}
                </p>
                <p>
                  <strong>Roll No:</strong> {student.rollno || "Unknown"}
                </p>
                <p>
                  <strong>Status:</strong> {student.status || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default LastMonthAttendance;
