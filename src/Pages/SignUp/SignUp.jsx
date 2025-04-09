import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import InputField from '../../Components/InputField/InputField'
import "./SignUp.css"
import loginImg from "../../assets/loginImg.png"
import {db, auth } from '../../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


const SignUp = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        address:"",
        sector:"",
        description:"",
        phone:"",
        website:""
      });

      navigate("/dashboard");

      alert("Account created successfully!");
    } catch (error) {
      setError(error.message);
    }
  };



  return (
    <div className='login'>
          <div className="loginBox">
            <img src={loginImg} alt="" />
            <div className="login-container">
          <h2 className="form-title">Sign Up</h2>
          <p className="separator"></p>
    
          <form onSubmit={handleSignUp} className="login-form">
            <InputField setData={setName} type="text" placeholder="Full Name" icon="id_card" />
            <InputField setData={setEmail} type="email" placeholder="Email address" icon="mail" />
            <InputField setData={setPassword} type="password" placeholder="Password" icon="lock" />
    
            <button type="submit" className="login-button">Sign Up</button>
          </form>
    
          <p className="signup-prompt">
            If you have an account? <Link to="/" className="signup-link">Login</Link>
          </p>
    </div>
            </div>
    </div>
  )
}

export default SignUp