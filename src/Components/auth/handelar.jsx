import React, { useState, useEffect } from 'react';
import { auth } from '../../config/fireBase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Outlet } from 'react-router-dom';
import SignUp from './signUp';


const AuthHandler = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate('/'); 
      } else {
        setUser(null);
        navigate('/auth'); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return user ? <Outlet /> : <SignUp />;
};

export default AuthHandler;