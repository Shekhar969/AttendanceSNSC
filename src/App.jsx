import snscLogo from "./assets/logo.png";
import "./App.css";

const studentsName =[
  {
    Roll_NO:1,
    name:"AAyush",
  },
  {
    Roll_NO:2,
    name:"Elisha",
  },
  {
    Roll_NO:3,
    name:"Roshan",
  },
  {
    Roll_NO:4,
    name:"Hairsh",
  },
  {
    Roll_NO:5,
    name:"Setal",
  },
]

function App() {
  return (
    <>
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />
      <div className="subjects">
        <a href="" className="subject" id="firstSubject"> <h3>Cryptography</h3> <h4>sir</h4> </a>
        <a href="" className="subject" id="firstSubject"> <h3>Cryptography</h3> <h4>sir</h4> </a>
        <a href="" className="subject" id="firstSubject"> <h3>Cryptography</h3> <h4>sir</h4> </a>
        <a href="" className="subject" id="firstSubject"> <h3>Cryptography</h3> <h4>sir</h4> </a>
        <a href="" className="subject" id="firstSubject"> <h3>Cryptography</h3> <h4>sir</h4> </a>
        <a href="" className="subject" id="firstSubject"> <h3>Cryptography</h3> <h4>sir</h4> </a>
      </div>
    </>
  );
}

export default App;
