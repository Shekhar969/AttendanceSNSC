import { Link } from "react-router-dom"
import StudentsData from "./student-details"
const DAA = () => {
    return (
        <>

            <h1>Subject Selected: Design and Analysis of Algorithms</h1>

            <Link to="/"><button type="button" className="back-button"> Back </button></Link>
            <main className="subject">
                <table>
                    <tr>
                        <th>Student&apos;s Name</th>
                        <th>Present</th>
                        <th>Absent</th>
                    </tr>
                    {/* students data: */}

                    {StudentsData.map((student) => (<>
                        <tr>
                            <td key={student['rollno']} className="student" data-rollno={student.rollno}>{student["name"]}</td>

                            <td><input type="radio" name={student["rollno"]} className="present" value="present" /></td>

                            <td>
                                <input type="radio" name={student["rollno"]} className="absent" value="absent" />
                            </td>
                        </tr>
                    </>
                    ))}


                </table>
            </main>
        </>
    )
}

export default DAA