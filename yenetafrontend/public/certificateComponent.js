import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import axios from "axios"

export default class Certificate extends Component{

    constructor(){
        super()
        this.state = {

            student:"",
            average:""
        }

        this.getStudent = this.getStudent.bind(this)
        this.getAverage = this.getAverage.bind(this)

    }

    getStudent(){

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/getStudent", { headers: header })
        .then(response => {
            console.log(response.data)
            this.setState({student:response.data.Student})
        })

    }
    getAverage(){

        const header ={
            "x-access-token" :localStorage.getItem("token")
        }

        axios.get("http://localhost:5000/getAverage", {headers:header})
            .then(response=>{

                this.setState({average:response.data.result})
            })
    }
    componentDidMount(){

        this.getStudent()
        this.getAverage()
    }

    render(){
        console.log(this.state.student)
        return (

            <div className="certificate">
                <Container className="conlogin">

                    <h1>CERTIFICATE</h1>
                    <h5>OF COMPLETION</h5>


                    <h4>{this.state.student.name}</h4>
                    <p>has successfull completed</p>

                    <h4>{this.state.student.level} Level</h4>
                    <p>With Average Mark {this.state.average}</p>

                    <img src = "../certificate-star.png" width="50" height ="50"/>
                   </Container>

            </div>
        )
    }
}