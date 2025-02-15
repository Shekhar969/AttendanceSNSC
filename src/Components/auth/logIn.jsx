import { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import "../App.css";

const Login = ({ logIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mainLogInContainer">
      <div className="topSection">
        <h3 className="userSignUpHeading">Log In</h3>
        <div className="goTOLogIn">
          <Link to="/signup">
            <FaArrowRightLong className="logInPageIcons" />
          </Link>
        </div>
      </div>
      
      <div className="inputContainers">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <IoIosMail className="signUpPageIcons" />
      </div>

      <div className="inputContainers">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>

      <button onClick={() => logIn(email, password)} className="logInBtn">
        Log In
      </button>
    </div>
  );
};

export default Login;