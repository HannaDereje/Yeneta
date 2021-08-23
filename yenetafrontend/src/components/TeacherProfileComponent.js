import React, {Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import TeacherNavBar from "./TeacherNavComponent"
import '../css/register.css'


import axios from "axios"

export default class TeacherProfile extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{},
            teacher:[]
        }

    }

    componentDidMount(){

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        
        axios.get("http://localhost:5000/getTeacher", {headers:header})
        .then(response=>{
            this.setState({teacher:response.data})
            console.log(this.state.teacher)
        })
        .catch((error)=>
            console.log(error)
        )

    }

    render(){
        return (
            <div>
                <TeacherNavBar>
                    <div className="whole">
                        <div className = "info">Teacher Information<hr/>
                        
                        <p>Full Name: <span>{this.state.teacher.contentManager.name}</span></p>
                        <p>Username: <span>{this.state.teacher.user.username}</span></p>  
                        <p>Email<span>{this.state.teacher.contentManager.email}</span></p>  
                        <p>Job: <span>{this.state.teacher.contentManager.job}</span></p>  
                        <p>Expriance: <span>{this.state.teacher.contentManager.experience}</span></p>  
                        
                        

                    
                        </div>
                     </div>
                </TeacherNavBar>
            </div>
        )

    }
}