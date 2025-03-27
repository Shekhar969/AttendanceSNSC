import React from "react";
import "../App.css";
function LoadingBarSpinner() {
  return (
    <div className="LoadingBarContianer">
      {/* <img src={LoadingBar} alt="Loading..." /> */}
      <div className="loader">
        <div className="loader__inner"></div>
        <div className="loader__orbit">
          <div className="loader__dot"></div>
          <div className="loader__dot"></div>
          <div className="loader__dot"></div>
          <div className="loader__dot"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingBarSpinner;
