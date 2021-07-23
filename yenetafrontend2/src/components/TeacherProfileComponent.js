import React, {Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import TeacherNavBar from "./TeacherNavComponent"
import '../css/register.css'

export default class TeacherProfile extends Component{

    render(){
        return (

            <div>
                <TeacherNavBar>
                    <div className="whole">
                        <div className = "info">Teacher Information<hr/>
                            
                        <p>Full Name: <span>lorem Ipsum</span></p>
                        <p>Username: <span>Lorem ipsum lorem</span></p>  
                        <p>Email<span> somone@gmail.com</span></p>  
                        <p>Job: <span>12</span></p>  
                        <p>Expriance: <span>Canada</span></p>  
                        
                        </div>
                    </div> 
                </TeacherNavBar>
            </div>
        )

    }
}