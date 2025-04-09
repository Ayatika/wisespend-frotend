import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { useMyContext } from '../../ContextPage';
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import { auth } from '../../../FirebaseConfig';

const Nav = () => {
  const {user} = useMyContext();
  const [show,setShow] = useState(false);

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("projectId");
      navigate("/");
      console.log("User logged out successfully.");
      // Redirect the user to the login page or any other page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleAccount=()=>{
    navigate("/accountProfile");
  }

  useEffect(()=>{
    if (user) {
      navigate("/dashboard");
    }
  },[user]);
  
const handleHome=()=>{
  navigate("/")
}
  return (
    <div className='nav'>
      <h2 onClick={handleHome}>WiseSpend</h2>
      {user && (
        <div onClick={()=> setShow(!show)} className="userData">
        <p className='userName'>{user.name}</p>
        <div className="userImage"></div>
  
        {show && (
          <div className="navModal">
          <p onClick={handleAccount}>Account</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
        )}
        </div>
      )}
    </div>
  )
}

export default Nav 