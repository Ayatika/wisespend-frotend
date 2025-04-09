import React, { useState } from 'react';
import "./AddProject.css"
import axios from 'axios';
import { useMyContext } from '../../ContextPage';
import { v4 as uuidv4 } from 'uuid';

const AddProjectForm = ({setShow}) => {

  const {user,apiUrl,getProjects,setBudjet,setTotalExpenses,setExpenses} = useMyContext();
  // State hooks for form values
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const uid = user.uid;  

    const projectId = uuidv4();

    const projectData = {
      projectId:projectId,
      uid,
      title,
      address,
      date,
      budget
    };

    const url = `${apiUrl}/saveProject`;
    const url2 = `${apiUrl}/api/projects`;


    // Here, you would typically send `projectData` to your server or handle it further.
    try {
      const response = await axios.post(url2,projectData);
      console.log(response)
      localStorage.setItem("projectId",JSON.stringify(response.data.projectId));

      
      console.log(response);
    } catch (error) {
      console.log(error.message)
    }

    // Optionally reset the form
    
    setTitle('');
    setAddress('');
    setDate('');
    setBudget('');
    setBudjet(0)
    setTotalExpenses(0)
    setExpenses([])
    
    setShow(false);
    getProjects();
  };

  return (
    <div className="form-container">
    <p onClick={()=> setShow(false)} className='cancel'>X</p>
      <h1 style={{fontSize:"22px"}}>Add Projet</h1>
      <form onSubmit={handleSubmit} id="projectForm">
        <div className="form-group">
          <label htmlFor="title">Project title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adress :</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Adress..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">monthly Budget:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Budget..."
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddProjectForm;
