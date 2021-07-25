import './App.css';
import React from 'react'
import {BrowserRouter as  Router, Route} from 'react-router-dom';

import HomeNavBar from './components/HomeNavbarComponent'
import Home from './components/HomeComponent'

import StudentLogin from './components/StudentLoginComponent'
import StudentRegister from './components/StudentRegisterComponent'
import TeacherRegister from './components/TeacherRegisterComponent'
import AdminHome from './components/AdminHomeComponent'
import Studentlist from './components/StudentsListComponent'
import TeacherHome from './components/TeacherHomeComponent'
import ClassRoom from './components/StudentClassRoomComponent' 

function App() {
  return ( 
    
    <Router>
    
    <Route  path="/" exact component={Home} />
    <Route  path="/studentLogin"  component={StudentLogin} />
    <Route  path="/studentRegister"  component={StudentRegister} />
    <Route  path="/teacherRegister"  component={TeacherRegister} />
    <Route  path="/adminHome"  component={AdminHome} />
    <Route  path="/teacherHome"  component={TeacherHome} />
    <Route path="/classroom" component={ClassRoom}/>
    </Router>
   
  );
}

export default App;