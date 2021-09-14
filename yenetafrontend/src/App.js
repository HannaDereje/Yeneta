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
import StudentProfile from "./components/StudentProfileComponent"
import TeacherProfile from "./components/TeacherProfileComponent"
import EntranceQuiz from "./components/QuizComponent"
import DiscussionRoom from "./components/StudentDiscussionRoomComponent"
import ResetPassword from "./components/ResetPasswordComponent"
import PasswordResetLink from "./components/LinkToEmailToResetPasswordComponent"

function App() {
  return ( 
    
    <Router>
    
    <Route  path="/" exact component={Home} />
    <Route  path="/studentLogin"  component={StudentLogin} />
    <Route path="/confirm/:code" component={Home}/>
    <Route  path="/studentRegister"  component={StudentRegister} />
    <Route  path="/teacherRegister"  component={TeacherRegister} />
    <Route  path="/adminHome"  component={AdminHome} />
    <Route  path="/teacherHome"  component={TeacherHome} />
    <Route path="/classroom" component={ClassRoom}/>
    <Route path="/studentProfile" component={StudentProfile}/>
    <Route path="/teacherProfile" component={TeacherProfile}/>
    <Route path="/entranceQuiz" component={EntranceQuiz}/>
    <Route path="/room" component = {DiscussionRoom}/>
    <Route path="/room?topic=''&username=''&id=''" component={DiscussionRoom}/>
    <Route path="/reset" component = {ResetPassword}/>
    <Route path="/passwordReset/:accessToken" component={PasswordResetLink}/>
    </Router>
   
  );
}

export default App;
