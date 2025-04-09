import React, { useState } from 'react';
import "./AddExpense.css"
import axios from 'axios';
import { useMyContext } from '../../ContextPage';
import { v4 as uuidv4 } from 'uuid';

const AddExpense = ({setShow}) => {

  const {user,apiUrl,projectId,getExpenses,getTotalExpenses,getHighestExpenses} = useMyContext();
  // State hooks for form values
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [amount,setAmount] = useState('');

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const uid = user.uid;

    const expenseId = uuidv4();
    const projectData = {
      expenseId: expenseId,
      uid,
      projectId,
      title,
      amount,
      date,
    };
    
    const url = `${apiUrl}/saveExpense`
    const url2 = `${apiUrl}/api/expenses`;

    // Here, you would typically send `projectData` to your server or handle it further.
    try {
      const response = await axios.post(url2,projectData).then(()=>{
        getTotalExpenses()
        getHighestExpenses()
      })
    } catch (error) {
      console.log(error.message)
    }

    // Optionally reset the form
    
    setTitle('');
    setDate('');
    setAmount('');
    setShow(false);
    getExpenses()
  };

  return (
    <div className="form-container">
    <p onClick={()=> setShow(false)} className='cancel'>X</p>
      <h1 style={{fontSize:"22px"}}>Add Expense</h1>
      <form onSubmit={handleSubmit} id="projectForm">
        <div className="form-group">
          <label htmlFor="title">Expense title:</label>
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
          <label htmlFor="phone">Amount:</label>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddExpense;
