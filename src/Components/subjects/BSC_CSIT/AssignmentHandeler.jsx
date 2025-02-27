import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import { db } from "../../../config/fireBase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import snscLogo from "../../../assets/logo.png";

const AssignmentHandler = () => {
  const { semester, subject } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!subject || !semester) {
      toast.error("Subject or Semester not found in URL!");
      navigate(-1);
    }
  }, [subject, semester, navigate]);

  // 🔹 Collection-based assignments
  const collectionName = `${semester}Assignments`;

  const dbDocId = `${subject}Assignment ~${new Date().toISOString().split("T")[0]}`;
  const attendanceCollectionName = `${semester}Attendance`;
  const AssignmentDocRef = doc(db, attendanceCollectionName, dbDocId);

  const fetchAssignments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      const filteredAssignments = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((assignment) => assignment.subject === subject)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setAssignments(filteredAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast.error("Failed to load assignments.");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [semester, subject]);

  // 🔹 Add/Edit Assignment (Stored in both collection & fixed document)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!message.trim()) {
      toast.error("Assignment cannot be empty!");
      return;
    }
  
    const assignmentId = `${subject}_${new Date().toISOString()}`; // Generate a predictable ID
    const assignmentRef = doc(db, collectionName, assignmentId); // Create a doc with custom ID
  
    const data = {
      subject,
      message,
      date: new Date().toISOString().split("T")[0],
    };
  
    try {
      // ✅ Store in a fixed document
      await setDoc(AssignmentDocRef, data);
      console.log("✅ Assignment successfully stored in single doc");
  
      // ✅ Store in a collection with a controlled ID
      if (editId) {
        const assignmentRef = doc(db, collectionName, editId);
        await updateDoc(assignmentRef, { message });
        toast.success("Assignment Updated Successfully");
        setEditId(null);
      } else {
        await setDoc(assignmentRef, data); // 🔥 Now using setDoc instead of addDoc
        toast.success("Assignment Added Successfully");
      }
  
      setMessage("");
      fetchAssignments();
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Error Submitting Assignment");
    }
  };
  


  const handleEdit = (assignment) => {
    setMessage(assignment.message);
    setEditId(assignment.id);
  };


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Assignment Deleted Successfully");
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Error Deleting Assignment");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="assignment-handler">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to={`/Bsc_Csit/${semester}`}>
        <button type="button" className="back-button">Back</button>
      </Link>
      <h2>Assignments for {subject} - {semester}</h2>

      <div className="assignments-container">
        <h3>All Assignments:</h3>
        {assignments.length > 0 ? (
          <div className="assignments-grid">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="assignment-card">
                <p><strong>Date:</strong> {assignment.date}</p>
                <p><strong>Assignment:</strong> {assignment.message}</p>
                <button className="edit-btn" onClick={() => handleEdit(assignment)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(assignment.id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No assignments for {subject} yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="assignmentForm">
        <textarea
          placeholder="Write Assignment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="3"
        />
        <br />
        <button className="send">{editId ? "Update" : "Submit"}</button>
      </form>

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default AssignmentHandler;
