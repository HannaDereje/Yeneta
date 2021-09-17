import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import axios from "axios"

export default class Certificate extends Component{

    constructor(props){
        super(props)
        this.state = {

            student:"",
            average:"",
            level:""
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
            this.setState({student:response.data.Student, 
                            level:response.data.Student.level})

        })

    }
    getAverage(){

        const header ={
            "x-access-token" :localStorage.getItem("token")
        }

        axios.get("http://localhost:5000/getAverage", {headers:header})
            .then(response=>{
                console.log(response.data)
                this.setState({average:response.data})
            })
    }

    

    componentDidMount(){

        this.getStudent()
        this.getAverage()
        console.log(this.state.level)
    }

    render(){
        return (

            <div className="conlogin">
                <Container className="certificate">
                <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle" onClick={()=>{ this.props.history.push(`classroom?level= ${this.state.level}`);}}>Continue Taking Lesson</Button>
                </Form.Group>
                <div className="content">
                <div className="certificatediv">
                    <h1>CERTIFICATE</h1>
                    <h5>OF COMPLETION</h5>


                    <h4>{this.state.student.name}</h4>
                    <p>has successfull completed</p>

                    <h4>{this.state.student.level} Level</h4>
                    <p>With Average Mark {this.state.average.average}</p>

                    <img src = "../certificate-star.png" width="150" height ="100"/>
                    </div>
                    </div>
                   </Container>
                  

            </div>
        )
    }
}