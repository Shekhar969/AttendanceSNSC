import React, { useState, useEffect } from "react";
import { auth, googleProvider, db } from "../config/fireBase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa"; // React Icons for visibility toggle
import { IoIosMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

function SignUp() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const passwordIcon = showConfirmPassword ? (
    <FaEye className="signUpPageIcons" />
  ) : (
    <FaEyeSlash className="signUpPageIcons" />
  );
  // Google Sign-Up
  const googleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      console.log("Google Sign-Up successful");
      handlePostSignUp(googleUser, googleUser.displayName);
    } catch (err) {
      console.error("Google Sign-Up failed:", err);
    }
  };

  // Email/Password Sign-Up
  const signUp = async () => {
    if (!Email || !Password || !ConfirmPassword) {
      console.warn("Please fill out all fields");
      return;
    }

    if (Password !== ConfirmPassword) {
      console.warn("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      console.log("Sign-Up successful:", userCredential.user);
      handlePostSignUp(userCredential.user, userName);
    } catch (err) {
      console.error("Sign-Up failed:", err.message);
    }
  };

  // Save User Data to Firestore
  const saveUserData = async (user, userName) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: userName || user.displayName || "",
        createdAt: new Date().toISOString(),
      });
      console.log("User data saved successfully");
    } catch (err) {
      console.error("Failed to save user data:", err);
      alert("Error saving user data. Please try again.");
    }
  };

  // Handle Post-Sign-Up Actions
  const handlePostSignUp = (user, userName) => {
    console.log(`Welcome, ${userName || user.email}`);
    saveUserData(user, userName);
    setUser(user);
    navigate("/");
  };

  // Log Out User
  const LogOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Successfully logged out");
      setUser(null);
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.email);
        setUser(user);
        navigate("/");
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div>
          <p>{userName || user.displayName || user.email}</p>
          <button onClick={LogOutUser}>Log Out</button>
          <div>
            <Link to="/Subjects" className="subject">
              <h3>Subjects</h3>
            </Link>
          </div>
          <div>
            <Link to="/AttendanceHistory" className="subject">
              <h3>Check Attendance</h3>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mainSignUpContainer">
          <h3 className="userSignUpHeading">Sign Up</h3>

          <label htmlFor="username">Username</label>
          <div className="inputContainers">
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              className="userName"
              onChange={(e) => setUserName(e.target.value)}
            />{" "}
            <div>
              <FaUser className="signUpPageIcons" />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <div className="inputContainers">
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="userEmail"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <div>
              <IoIosMail className="signUpPageIcons" />
            </div>
          </div>

          <label htmlFor="password">Password</label>
          <div className="inputContainers">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="userPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={handlePasswordToggle} className="passwordToggleIcon">
              {passwordIcon}
            </div>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="inputContainers">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div onClick={handlePasswordToggle} className="passwordToggleIcon">
              {passwordIcon}
            </div>
          </div>

          <button onClick={signUp} className="signUpBtn">
            Sign Up
          </button>
          <span>OR</span>
          <button onClick={googleSignUp} className="googleSignUPBtn">
            <FcGoogle className="googleSignUPBtnIcon" />
            <span>Sign Up with Google</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
