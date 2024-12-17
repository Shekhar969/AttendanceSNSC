import snscLogo from "./assets/logo.png";
import "./App.css";

function App() {
  return (
    <>
      <img src={snscLogo} className="snscLogo" alt="SnscLogo" />
      <div className="subjects">
        <a href="" className="subject" id="firstSubject"> <span>Cryptography</span></a>
        <a href="" className="subject" id="secondSubject"> <span>Web Technology</span> </a>
        <a href="" className="subject" id="thirdSubject"> <span>Wireless Networking</span> </a>
        <a href="" className="subject" id="thirdSubject"> <span>Wireless Networking</span> </a>
        <a href="" className="subject" id="thirdSubject"> <span>Wireless Networking</span> </a>
        <a href="" className="subject" id="thirdSubject"> <span>Wireless Networking</span> </a>
      </div>
    </>
  );
}

export default App;
