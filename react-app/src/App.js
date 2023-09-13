import './App.css';
import Header from './components/Header/index';
import Navbar from './components/Navbar/index';
import App1 from './App1';
import Books from './components/Books/books';
import TextBook from './components/TextBook/textBook';
import Notes from './components/notes/note'
import DashBoard from './components/DashBoard/dashboard';
import Recommendation from './components/recommendation/recommendation';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'; 
import React, { useState } from 'react';


function App() {
const[userIdOfLogin,setUserIDOFLogin]=useState();
  return (
    <Router>
    <div className="Home">
      <Header  setUserIDOFLogin={setUserIDOFLogin}/>
      <Navbar/>
      <Switch>
        <Route exact path="/"  component={App1}/>
        <Route exact path="/dashboard">
          <DashBoard />
        </Route>
        <Route exact path="/Books">
          <Books data={userIdOfLogin}/>
        </Route>
        <Route exact path="/textBook">
          <TextBook data={userIdOfLogin}/>
        </Route>
        <Route exact path="/Notes">
          <Notes data={userIdOfLogin} />

        </Route>
        <Route exact path="/Recommendation">
          <Recommendation data={userIdOfLogin}/>

        </Route>
    
      </Switch>



      



    </div>
    </Router>
  
  );
}

export default App;
