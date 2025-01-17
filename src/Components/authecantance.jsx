import React, { useState, useEffect } from "react";
import { auth, googleProvider, db } from "../config/fireBase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut,onAuthStateChanged,} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt, FaUser, FaEye, FaEyeSlash } from "react-icons/fa"; 
import { IoIosMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import homeLogo from "../assets/homePageLogo.png";
import "../App.css";

function SignUp() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar state
  const [flipThePage, setFlipThePage] = useState(true); // State for SignUp and LogIn toggle
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const passwordIcon = showConfirmPassword ? (
    <FaEye className="signUpPageIcons" />
  ) : (
    <FaEyeSlash className="signUpPageIcons" />
  );

  const logIn = async () => {
    if (!Email || !Password) {
      setError("Please enter both email and password.");
      return;
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
      console.log("Logged in successfully:", userCredential.user);
      
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed. Please check your credentials.");
    }
  };

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

  const handlePostSignUp = (user, userName) => {
    console.log(`Welcome, ${userName || user.email}`);
    saveUserData(user, userName);
    setUser(user);
    navigate("/");
  };

  const LogOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Successfully logged out");
      setUser(null); // Clear user state in React
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const flipPage = () => {
    setFlipThePage((prev) => !prev); // Toggle between SignUp and LogIn
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.email);
        setUser(user);
        setIsSidebarVisible(false); // Set the sidebar to false when the user logs in
        navigate("/");
      } else {
        console.log("No user logged in");
        setUser(null);
        setIsSidebarVisible(false); // Ensure sidebar is closed when logged out
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div className="mainPageCointiner">
          <div className="navbarHome">
            <div className="logoScsn">
              <img src={homeLogo} className="homeLogo" alt="MainLogo" />
            </div>
            <div>
              {!isSidebarVisible && (
                <FaUserAlt className="userPhoto" onClick={toggleSidebar} />
              )}

              <div className={`sideBar ${isSidebarVisible ? "visible" : ""}`}>
                <IoCloseSharp className="closeNavBar" onClick={toggleSidebar} />
                <div>
                  <p className="userName">
                    {" "}
                    Hello, {userName || user.displayName || "User"}
                  </p>
                  <p className="userEmail">
                    {user.email || "No email provided"}
                  </p>
                </div>
                <button onClick={LogOutUser} className="userLogOutBtn">
                  Log Out
                </button>
              </div>
            </div>
          </div>
          <div className="menu">
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
        </div>
      ) : (
        <div
          className={flipThePage ? "mainSignUpContainer" : "mainLogInContainer"}
        >
          {flipThePage ? (
            <>
              <div className="topSection">
                <h3 className="userSignUpHeading">Sign Up</h3>
                <div className="goTOLogIn">
                  <FaArrowRightLong onClick={flipPage} />
                </div>
              </div>
              <label htmlFor="username">Username</label>
              <div className="inputContainers">
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="userName"
                  onChange={(e) => setUserName(e.target.value)}
                />
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
                />
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
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="passwordToggleIcon"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
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
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="passwordToggleIcon"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
            </>
          ) : (
            <div className="loginSection">
              <div className="topSection">
                <h3 className="userSignUpHeading">Log In</h3>
                <div className="goTOLogIn">
                  <FaArrowRightLong onClick={flipPage} className="logInPageIcons" />
                </div>
              </div>
              <label htmlFor="username">Username</label>
              <div className="inputContainers">
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="userName"
                  onChange={(e) => setUserName(e.target.value)}
                />
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
                />
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
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="passwordToggleIcon"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            
              <button onClick={logIn} className="logInBtn">
                Log In
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SignUp;
