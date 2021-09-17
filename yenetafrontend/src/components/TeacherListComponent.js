import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import '../css/register.css'

export default class TeacherList extends Component {
    constructor() {
        super()
        this.state = {
            teachers: [],
            users:[]
        }

    }
    componentDidMount() {

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/getAllTeachers", {headers:header})
            .then(res => {
                this.setState({ teachers: res.data.contentmanager, users:res.data.users })
                this.state.teachers.forEach(s=>{
                    if(this.state.users.find(user => user.email == s.email)){
                        var user = this.state.users.find(user => user.email == s.email)

                       s["username"]= user.username
                       this.setState({teachers:this.state.teachers})
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
                <h4 className="text-center">Teachers List</h4>

                <table className="tlist widthstyle m-auto">
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>job</th>
                    <th>experience</th>
                    {this.state.teachers.map(teacher =>
                        <tr>

                            <td key={teacher.name}>{teacher.name}</td>
                            <td key={teacher.name}>{teacher.username}</td>
                            <td key={teacher.id}>{teacher.email}</td>
                            <td key={teacher.id}>{teacher.job}</td>
                            <td key={teacher.id}>{teacher.experience}</td>

                        </tr>)}

                </table>
            </div>
        )

    }
}