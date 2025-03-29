import React, { useState, useEffect } from "react";
import { auth, googleProvider, db } from "../../config/fireBase";
import LoadingBarSpinner from "../loading-bar";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRightLong } from "react-icons/fa6";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [flipThePage, setFlipThePage] = useState(true);
  const navigate = useNavigate();

  const passwordIcon = showConfirmPassword ? (
    <FaEye className="signUpPageIcons" />
  ) : (
    <FaEyeSlash className="signUpPageIcons" />
  );

  const flipPage = () => {
    setFlipThePage((prev) => !prev);
  };

  const signUp = async () => {
    setLoading(true);
    if (!Email || !Password || !ConfirmPassword) {
      toast.warning("Please fill out all fields");
      return;
    }

    if (Password !== ConfirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    if (Password.length < 6) {
      toast.warning("Password length must be at least 6 characters");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      await sendEmailVerification(userCredential.user);
      setLoading(false);
      console.log("Sign-Up successful:", userCredential.user);
      handlePostSignUp(userCredential.user, userName);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else {
        console.error("Sign-Up failed:", err.message);
        toast.error("Sign-Up failed:", err.message);
      }
    }
  };

  const logIn = async () => {
    if (!Email || !Password) {
      toast.warning("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      toast.success(`Logged in successfully:, ${userCredential.user}`);
      console.log("Logged in successfully:", userCredential.user);
      setUser(userCredential.user);
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Login failed:", err.message);
      toast.error("Login failed. Please check your credentials.", err);
    }
  };

  // Google Sign Up
  const googleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      console.log("Google Sign-Up successful");
      toast.success("Google Sign-Up successful");
      handlePostSignUp(googleUser, googleUser.displayName);
    } catch (err) {
      toast.error("Google Sign-Up failed:", err);
      console.error("Google Sign-Up failed:", err);
    }
  };

  const handlePostSignUp = (user, userName) => {
    console.log(`Welcome, ${userName || user.email}`);
    toast.info(`Welcome, ${userName || user.email}`);
    saveUserData(user, userName);
    setUser(user);
    navigate("/");
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
      toast.error("Error saving user data. Please try again.");
    }
  };

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
    <>
      {isLoading ? (
        <LoadingBarSpinner />
      ) : (
        <div
          className={flipThePage ? "mainSignUpContainer" : "mainLogInContainer"}
        >
          {flipThePage ? (
            <div className="signUpForm">
              <div className="topSection">
                <h3 className="userSignUpHeading">Sign Up</h3>
                <div className="" onClick={flipPage}>
                  <div className="goTOLogIn">
                    {/* <label>login</label> */}
                    <FaArrowRightLong />
                  </div>
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
                <FaUser className="signUpPageIcons" />
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
                <IoIosMail className="signUpPageIcons" />
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
              <ToastContainer autoClose={2000} />
              <span>OR</span>
              <button onClick={googleSignUp} className="googleSignUPBtn">
                <ToastContainer autoClose={2000} />
                <FcGoogle className="googleSignUPBtnIcon" />
                <span>Sign Up with Google</span>
              </button>
            </div>
          ) : (
            <div className="logInForm">
              <div className="topSection">
                <h3 className="userSignUpHeading">Log In</h3>
                <div className="goTOLogIn">
                  <FaArrowRightLong onClick={flipPage} />
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
                <IoIosMail className="signUpPageIcons" />
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
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default SignUp;
