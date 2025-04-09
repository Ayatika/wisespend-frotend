import React, { useEffect, useState } from 'react';
import "./UpdateExpense.css"
import axios from 'axios';
import { useMyContext } from '../../ContextPage';
import { v4 as uuidv4 } from 'uuid';

const UpdateExpenseForm = ({fields,setShow}) => {

  const {user,apiUrl,getProjects,getExpenses,setBudjet,setTotalExpenses,setExpenses,getHighestExpenses,getTotalExpenses} = useMyContext();
  // State hooks for form values
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');


  useEffect(()=>{
    setTitle(fields.title)
    setDate(fields.date)
    setAmount(fields.amount)

  },[fields])

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const uid = user.uid;  

    const projectData = {
      title,
      date,
      amount
    };

    console.log(projectData)
    
    const projectId = fields.projectId;
    const expenseId = fields.expenseId;

    const url = `${apiUrl}/saveProject`;
    const url2 = `${apiUrl}/api/expenses/${projectId}/${uid}/${expenseId}`;

    try {
      const response = await axios.put(url2,projectData).then(()=>{
        getExpenses();
        getHighestExpenses();
        getTotalExpenses();
      })

    } catch (error) {
      console.log(error.message)
    }

    // Optionally reset the form
    
    setTitle('');
    setDate('');
    setAmount('');
    setShow(false);    
  };

  return (
    <div className="form-container">
    <p onClick={()=> setShow(false)} className='cancel'>X</p>
      <h1 style={{fontSize:"22px"}}>Update Projet</h1>
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateExpenseForm;
