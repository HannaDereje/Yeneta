import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import TeacherNavBar from "./TeacherNavComponent"
import '../css/register.css'


import axios from "axios"

export default class TeacherProfile extends Component {

    constructor() {
        super()
        this.state = {

            input: {},
            errors: {},
            teacher: {},
            user: {}

        }

    }

    componentDidMount() {

        const header = {
            "x-access-token": localStorage.getItem("token")
        }
        //console.log(header)
        axios.get("http://localhost:5000/getProfile", { headers: header })
            .then(response => {
                console.log(response.data)
                this.setState({ teacher: response.data.contentManager })
                this.setState({ user: response.data.user })
                console.log(this.state.teacher)
            })
            .catch((error) =>
                console.log(error)
            )

    }

    render() {
        return (
            <div>
                <TeacherNavBar user={this.state.user.username}>
                    <div className="whole">
                        <div className="info">Teacher Information<hr />

                            <p>Full Name: <span>{this.state.teacher.name}</span></p>
                            <p>Username: <span>{this.state.user.username}</span></p>
                            <p>Email: <span>{this.state.teacher.email}</span></p>
                            <p>Job: <span>{this.state.teacher.job}</span></p>
                            <p>Expriance: <span>{this.state.teacher.experience}</span></p>




                        </div>
                    </div>
                </TeacherNavBar>
            </div>
        )

    }
}