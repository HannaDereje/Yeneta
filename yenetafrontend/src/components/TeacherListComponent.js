import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

export default class TeacherList extends Component {
    constructor() {
        super()
        this.state = {
            teachers: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get("http://localhost:5000/getAllTeachers")
            .then(res => {
                this.setState({ teachers: res.data })
                console.log(res)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Teachers List</h4>

                <table className="table table-striped table-bordered table-hover tablestyle">
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>job</th>
                    <th>experience</th>
                    {this.state.teachers.map(teacher =>
                        <tr>
                            <td key={teacher.id} >{teacher.name}</td>
                            <td key={teacher.id}>{teacher.username}</td>
                            <td key={teacher.id}>{teacher.email}</td>
                            <td key={teacher.id}>{teacher.job}</td>
                            <td key={teacher.id}>{teacher.experience}</td>

                        </tr>)}

                </table>
            </div>
        )

    }
}