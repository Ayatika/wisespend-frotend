import axios from 'axios';
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { auth, db } from '../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ContextPage = createContext();

export const ContextPageProvider = ({ children }) => {
  const [log, setLog] = useState(false);
  const [user,setUser] = useState(null);
  const [projects,setProjects] = useState([]);
  const [projectId,setProjectId] = useState("");
  const [budget,setBudjet] = useState(0);
  const [expenses,setExpenses] = useState([]);
  const [highestExpenses,setHighestExpenses] = useState([]);
  const [totalExpenses,setTotalExpenses] = useState(0)

  const apiUrl = "http://localhost:8000";

  const fetchUserById = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef); 
  
      if (docSnap.exists()) {
        setUser(docSnap.data())
      } else {
        console.log("No such document!");
        setUser(null)
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };


  const getProjects = async() => {
    const uid = user?.uid;
    
    const url = `${apiUrl}/getProjects/${uid}`;
      const url2 = `${apiUrl}/api/projects/${uid}`;
    try {

      const response = await axios.get(url2);
      setProjects(response.data)
    } catch (error) {
      console.log(error.message)
    }
  };

  const getProjectBudget = async() => { 
    const uid = user?.uid;

    const url = `${apiUrl}/getProjectBudget/${uid}/${projectId}`
    const url2 = `${apiUrl}/api/projects/totalBudget/${projectId}/${uid}`;

    try {
      const response = await axios.get(url2);
      setBudjet(response?.data)
    } catch (error) {
      console.log(error.message)
    }
  };

  const getExpenses=async()=>{
    const uid = user?.uid;

    const url = `${apiUrl}/getExpenses/${uid}/${projectId}`
    const url2 = `${apiUrl}/api/expenses/${projectId}/${uid}`;
    
    try {
      const response = await axios.get(url2);
      setExpenses(response.data)
      console.log(response.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  const getTotalExpenses=async()=>{
    const uid = user?.uid;

    const url = `${apiUrl}/getTotalExpenses/${uid}/${projectId}`
    const url2 = `${apiUrl}/api/expenses/totalExpenses/${projectId}/${uid}`;
    try {
      const response = await axios.get(url2);
      console.log(response.data)
      setTotalExpenses(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  

  const getHighestExpenses=async()=>{
    const uid = user?.uid;

    const url = `${apiUrl}/getHighestExpenses/${uid}/${projectId}`
    const url2 = `${apiUrl}/api/expenses/highestExpense/${projectId}/${uid}`;
    
    try {
      const response = await axios.get(url2);
      setHighestExpenses(response.data) 
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
 
  useEffect(()=>{
    if (user) {      
      getProjects();
    }
  },[user]);

  useEffect(()=>{
    if (projectId && user) {
      getProjectBudget();
      getTotalExpenses();
      getExpenses();
      getHighestExpenses();
    }
  },[projectId,user])

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        fetchUserById(currentUser.uid); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  useEffect(()=>{
    if (projectId) {
      localStorage.setItem("projectId",JSON.stringify(projectId));
    }
  },[projectId]);

  useEffect(()=>{
    try {
      const value = JSON.parse(localStorage.getItem("projectId"));
      setProjectId(value);
    } catch (error) {
      console.log(error)
    }
  },[]);

  return (
    <ContextPage.Provider value={{apiUrl,user,setUser,projects,getProjects,projectId,setProjectId,budget,getExpenses,expenses,totalExpenses,setBudjet,getTotalExpenses,setTotalExpenses,setExpenses,highestExpenses,setHighestExpenses,getHighestExpenses,getProjectBudget}}>
      {children}
    </ContextPage.Provider>   
  ); 
};
  
export const useMyContext = () => {
  return useContext(ContextPage); 
};
