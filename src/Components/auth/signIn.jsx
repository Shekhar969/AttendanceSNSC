import React, { useEffect } from "react";
import { islogedin } from "../authecantance";

function signIn() {
  const isAnyoneIsLogedIn = () => {
    {islogedin==null?openSignInPage():displayUserDetails()}

    useEffect()=()=>{
        isAnyoneIsLogedIn()
        ,[]
    }
  };
  return <div>signIn</div>;
}

export default signIn;
