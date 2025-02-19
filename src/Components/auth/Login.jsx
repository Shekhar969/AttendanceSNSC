import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const notify = () => toast("Wrong Credentials. Try again!");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const navigate = useNavigate();
  const handleLoginClick = () => {

    if (name === "teacher" && password ==="snsc")
    {
        setIsAuthenticated(true);
        navigate("/");
    }
    else{
        notify();
    }

  }

  return (
    <form className="login-form">
      <fieldset>
        <legend>Login Form for Teachers</legend>
        <div>
          <label for="name">Enter Name:</label>
          <input
            id="name"
            type="text"
            required
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label for="password">Enter Password:</label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLoginClick}>Submit</button>
      </fieldset>
    </form>
  );
};

export default Login;
