import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function classLInks() {
  return (
    <>
      <Link to="/">
        <button type="button" className="back-button , subject ">
          Back
        </button>
      </Link>
      <div className="subjects">
        <Link to='/Bsc_Csit/firstSem'>
              <button className="subject" >
            <h3> 1st Sem</h3>     
          </button>
        </Link>
        {/* <Link to="">
              <button className="subject" >
            <h3> 2st Sem</h3>     
          </button>
        </Link> */}
        <Link to="/Bsc_Csit/thirdSem">
              <button className="subject" >
            <h3> 3st Sem</h3>     
          </button>
        </Link>
        {/* <Link to="">
              <button className="subject" >
            <h3> 4st Sem</h3>     
          </button>
        </Link> */}
        <Link to="/Bsc_Csit/fifthSem">
              <button className="subject" >
            <h3> 5st Sem</h3>     
          </button>
        </Link>
        {/* <Link to="">
              <button className="subject" >
            <h3> 6st Sem</h3>     
          </button>
        </Link> */}
        <Link to="">
              <button className="subject" >
            <h3> 7st Sem</h3>     
          </button>
        </Link>
        {/* <Link to="">
              <button className="subject" >
            <h3> 8st Sem</h3>     
          </button>
        </Link> */}

       
      </div>
    </>
  );
}

export default classLInks;
