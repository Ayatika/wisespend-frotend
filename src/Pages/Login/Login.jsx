import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import InputField from '../../Components/InputField/InputField'
import "./Login.css"
import loginImg from "../../assets/loginImg.png"
import { auth } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useMyContext } from '../../ContextPage';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false)
  const [error, setError] = useState("");
  const {setProjectId,setBudjet,setTotalExpenses,setExpenses,setHighestExpenses} = useMyContext();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setProjectId("")
    setBudjet(0)
    setTotalExpenses(0)
    setHighestExpenses([])
    setExpenses([])


    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully.");
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Invalid email or password.");
    }
  };

  useEffect(()=>{
    setTimeout(()=>{
      setShow(true)
    },400)
  },[])

  return (
    <div className='login'>

    {show && (
      <div className="loginBox">
      <img src={loginImg} alt="" />
      <div className="login-container">
        <h2 className="form-title">Login</h2>
        <p className="separator"></p>
  
        <form onSubmit={handleLogin} className="login-form">
          <InputField setData={setEmail} type="email" placeholder="Email address" icon="mail" />
          <InputField setData={setPassword} type="password" placeholder="Password" icon="lock" />
          
          <button type="submit" className="login-button">Log In</button>
        </form>
  
        <p className="signup-prompt">
          Don&apos;t have an account? <Link to="/signUp" className="signup-link">Sign up</Link>
        </p>
      </div>
      </div>
    )}
    </div>
  )
}

export default Login