import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import axios from "axios"

export default class Certificate extends Component{

    constructor(){
        super()
        this.state = {

            student:""
        }

        this.getStudent = this.getStudent.bind(this)

    }

    getStudent(){

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/getStudent", { headers: header })
        .then(response => {
            this.setState({student:response.data})
        })

    }

    render(){
        return (

            <div className="certificate">
                <Container className="conlogin">

                    <h1>CERTIFICATE</h1>
                    <h5>OF COMPLETION</h5>


                    <h4>{this.state.student.name}</h4>
                    <p>has successfull completed</p>

                    <h3>{this.state.student.level}</h3>
                    <p>With Mark 45</p>

                    <img src = "../certificate-star.png"/>
                   </Container>

            </div>
        )
    }
}