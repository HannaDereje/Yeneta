import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

export default class Studentlist extends Component {
    constructor() {
        super()
        this.state = {
            students: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get("http://localhost:5000/getAllStudent")
            .then(res => {
                this.setState({ students: res.data })
                console.log(res.data.email)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Student List</h4>

                <table className="table table-striped table-bordered table-hover tablestyle">
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Country</th>
                    <th>Level</th>
                    {this.state.students.map(student =>
                        <tr>
                            <td>{student.name}</td>
                            <td key={student.name}>{student.username}</td>
                            <td key={student.name}>{student.email}</td>
                            <td key={student.name}>{student.age}</td>
                            <td key={student.name}>{student.country}</td>
                            <td key={student.name}>{student.level}</td>
                        </tr>)}

                </table>
            </div>
        )

    }
}