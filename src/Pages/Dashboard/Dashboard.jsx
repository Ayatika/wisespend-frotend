import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { useMyContext } from '../../ContextPage'
import AddProjectForm from '../../Components/AddProject/AddProject';
import AddExpense from '../../Components/AddExpense/AddExpense';
import axios from 'axios';
import Chatbot from '../../Components/Chatbox/Chatbot';
import UpdateExpenseForm from '../../Components/UpdateExpense/UpdateExpense';

const Dashboard = () => {
  const {user,projects,setProjectId,projectId,budget,expenses,totalExpenses,highestExpenses,apiUrl,getExpenses,getTotalExpenses,getHighestExpenses,getProjectBudget} = useMyContext();
  const [show,setShow] = useState(false);
  const [show2,setShow2] = useState(false);
  const [show3,setShow3] = useState(false);
  const [updatedData,setUpdatedData] = useState(null);

  const deleteExpense=async(expenseId,id)=>{

    const uid = user.uid;

    const url = `${apiUrl}/deleteExpense/${id}/${uid}/${projectId}`;
    const url2 = `${apiUrl}/api/expenses/${expenseId}/${uid}/${projectId}`
    try {
      const response = await axios.delete(url2).then(()=>{
        getExpenses();
      }).then(()=>{
        getTotalExpenses();
      })

      getHighestExpenses();
      getProjectBudget();
    } catch (error) {
      console.log(error)
    }
  }


  const showUpdateModal=async(item)=>{
    setUpdatedData({...item});
    setShow3(true);
  }

  return (
    <div className='dashboard'>
      
      {show && (
        <div className="addProjectContainer">
          <AddProjectForm setShow={setShow}/>
        </div>
      )}

      {show2 && (
        <div className="addProjectContainer">
          <AddExpense setShow={setShow2}/>
        </div>
      )}

      {show3 && (
        <div className="addProjectContainer">
          <UpdateExpenseForm fields={updatedData} setShow={setShow3}/>
        </div>
      )}
          <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Your Expenses Analysis</h1>
           
          </div>

          <div className='projectManagement'>
          <button onClick={()=>{setShow(true)}}>+</button>
          <select value={projectId} onChange={(e)=> setProjectId(e.target.value)} className='selectProject' name="" id="">
            <option value="">----------------</option>
            {projects.length > 0 && projects?.map((item,index)=>{return(
              <option key={index} value={item?.projectId}>{item?.title}</option>
            )})}
          </select>
          </div>

         
        </div>

        <div className="box-info">
          <li>
            <i className="fas fa-calendar-check"></i>
            <span className="text">
              <h3>{budget?.toFixed(2) || 0} MAD</h3>
              <p>Initial Budget</p>
            </span>
          </li>
          <li>
            <i className="fas fa-people-group"></i>
            <span className="text">
              <h3>{totalExpenses?.toFixed(2) || 0} MAD</h3>
              <p>Total Expenses</p>
            </span>
          </li>
          <li>
            <i className="fas fa-dollar-sign"></i>
            <span className="text">
              <h3>{budget?.toFixed(2) - totalExpenses?.toFixed(2) || 0} MAD</h3>
              <p>Available To Pay Out</p>
            </span>
          </li>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Expenses</h3>
             <button onClick={()=> setShow2(true)} className='addExpense'>Add expense</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Expense Date</th>
                  <th>Amount</th>
                  <th style={{textAlign:"end"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 && expenses.map((item,index)=>{return(
                  <tr key={index}>
                  <td>
                    <p>{item?.title}</p>
                  </td>
                  <td>{item?.date?.substring(0,10)}</td>
                  <td>{item?.amount}</td>
                  <td style={{textAlign:"end"}}><button onClick={()=>showUpdateModal(item)} className='update'>Update</button><button onClick={()=>deleteExpense(item.expenseId)} className='delete'>Delete</button></td>
                </tr>
                )})}
                
               
              
              </tbody>
            </table>
          </div>


          <div className="todo">
            <div className="head">
              <h3>Highest expenses</h3>
              <i className="fas fa-plus"></i>
              <i className="fas fa-filter"></i>
            </div>

            {highestExpenses.length > 0 && highestExpenses?.map((item,index)=>{return(
              <div key={index} className="transaction">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <label htmlFor="wifi">{item?.title}</label>
              <p>{item?.date?.substring(0,10)}</p>
              </div>
              <p style={{fontWeight:"bold",color:"#0d6efd"}}>{item?.amount} MAD</p>
            </div>
            )})}

    

          </div>
         </div>
      </main>
    </section>


    </div>
  )
}

export default Dashboard