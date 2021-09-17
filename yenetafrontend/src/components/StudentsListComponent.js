import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import '../css/register.css'
import { Container, Jumbotron, Button, Form, Table } from "react-bootstrap"
export default class Studentlist extends Component {
    constructor() {
        super()
        this.state = {
            students: [],
            users:[]
        }

    }
    componentDidMount() {

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/getAllStudent", {headers:header})
            .then(res => {
                console.log(res.data)
                
                this.setState({ students: res.data.students, users:res.data.users })
                this.state.students.forEach(s=>{
                    if(this.state.users.find(user => user.email == s.email)){
                        var user = this.state.users.find(user => user.email == s.email)

                       s["username"]= user.username
                       this.setState({students:this.state.students})
                    }
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Student List</h4>

                <Table className=" slist widthstyle m-auto">
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Country</th>
                    <th>Level</th>
                    {this.state.students.map((student, index) =>
                     <tr>
                            <td key={student.name}>{student.name}</td>
                            <td key={student.name}>{student.username}</td>
                            <td key={student.name}>{student.email}</td>
                            <td key={student.name}>{student.age}</td>
                            <td key={student.name}>{student.country}</td>
                            <td key={student.name}>{student.level}</td>
                        </tr>)}

                </Table>
            </div>
        )

    }
}