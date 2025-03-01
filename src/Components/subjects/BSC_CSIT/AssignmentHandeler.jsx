import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import { db } from "../../../config/fireBase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import snscLogo from "../../../assets/logo.png";
import { MdDateRange,MdAssignment ,MdDelete} from "react-icons/md";
import { FaCalendarAlt ,FaEdit} from "react-icons/fa";




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
            setTimeout(() => {
                    navigate("/auth");
                  }, 1500);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [semester, subject]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!message.trim()) {
      toast.error("Assignment cannot be empty!");
      return;
    }
  
    const data = {
      subject,
      message,
      date: new Date().toISOString().split("T")[0],
    };
  
    try {
      
      await setDoc(AssignmentDocRef, data);
  
      if (editId) {
        
        const assignmentRef = doc(db, collectionName, editId);
        await updateDoc(assignmentRef, { message });
        toast.success("Assignment Updated Successfully");
        setEditId(null);
      } else {
       
        await addDoc(collection(db, collectionName), data);
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
    <div className="assignmentHandler">
      <img src={snscLogo} className="snscLogo" alt="Snsc Logo" />
      <Link to={`/Bsc_Csit/${semester}`}>
        <button type="button" className="back-button">Back</button>
      </Link>
      <div className="assignmentFormHandler"> 
      <form onSubmit={handleSubmit} className="assignmentForm">
        <textarea
          placeholder="Write Assignment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="3"
          className="textareaClass"
        />
        <button className="send">{editId ? "Update" : "Submit"}</button>
        
      </form></div>
      <h4>Assignments for  {semester} {subject}</h4>

      <div className="assignmentscontainer">
        <h4>All Assignments</h4>
        {assignments.length > 0 ? (
          <div className="assignmentsgrid">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="assignmentcard">
              <div className="assignmentNavSection"> <p> <FaCalendarAlt/> {assignment.date}</p>
               <div className="assignmentEditDelSection"> <button className="editbtn" onClick={() => handleEdit(assignment)}><FaEdit/></button>
                <button className="deletebtn" onClick={() => handleDelete(assignment.id)}><MdDelete/></button>
                </div> </div> 
                <p>{assignment.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No assignments for {subject} yet.</p>
        )}
      </div>



      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default AssignmentHandler;
