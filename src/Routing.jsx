import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation
  } from 'react-router-dom';

import { useMyContext } from './ContextPage';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard';

import NotFound from './Pages/NotFound/NotFound';
import Nav from './Components/Nav/Nav';
import Account from './Pages/Account/Account';
  

function Routings() {
  const {user} = useMyContext();
 

  /*
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.onkeydown = function (e) {  
// disable F12 key
if(e.keyCode == 123) {  
return false;
}
 
// disable I key
if(e.ctrlKey && e.shiftKey && e.keyCode == 73){
return false; 
} 
 
// disable J key0
if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
return false;
}

// disable U key
if(e.ctrlKey && e.keyCode == 85) {
return false;
}
  }

 
  */

  
 
  return (
    <Router> 
      <Nav/>
    <Routes> 
    {user && (<Route exact path='/' element={<Dashboard/>}></Route>)}
    {!user && (<Route exact path='/' element={< Login />}></Route>)}

    <Route exact path='/signUp' element={user ? <Dashboard/> : < SignUp />}></Route>
    <Route exact path='/dashboard' element={< Dashboard />}></Route>
    {user && (<Route exact path='/accountProfile' element={<Account/>}></Route>)}

    <Route  path='/*' element={< NotFound />}></Route>


    </Routes>
    </Router>
  )
}

export default Routings