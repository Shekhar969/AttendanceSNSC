import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaQuestionCircle,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "../navBar";

import "../../App.css";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    console.log(formData);

    alert("Support request submitted!");

    setFormData({
      name:"",
      email:"",
      message:""
    });
  };

  return ( <>
<Navbar/>
    <div className="supportContainer">

      <div className="supportHeader">
        <h1>Support Center</h1>
      </div>

      <div className="supportGrid">

        {/* Contact card */}

        <div className="supportCard">

          <h2>
            <FaQuestionCircle />
            Contact Information
          </h2>

          <div className="contactItem">

            <FaEnvelope />

            <span>
              shekharrawal96@gmail.com
            </span>

          </div>

          <div className="contactItem">

            <FaPhoneAlt />

            <span>
              +977 9742846227
            </span>

          </div>

        </div>

        {/* Form card */}

        <div className="supportCard">

          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Describe your problem..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="supportBtn"
            >
              <FaPaperPlane />
              Submit Request
            </button>

          </form>

        </div>

      </div>

    </div></>
  );
};

export default Support;