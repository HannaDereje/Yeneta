import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Container, Button, Form, Table } from "react-bootstrap"

export default class Studentlist extends Component {
    constructor() {
        super()
        this.state = {
            approvedLessons: [],
            approvedLessons2: []
        }
        this.approve = this.approve.bind(this)

        this.componentDidMount = this.componentDidMount.bind(this)
    }
    async approve(id) {
        console.log(id)
        axios.get(`http://localhost:5000/getLesson/${id}`)
            .then(res => {
                if (res.data.approved == false) {
                    //res.data.approved=true
                    axios.put(`http://localhost:5000/approveLesson/${id}`)
                        .then(res => {
                            console.log(res)
                            this.componentDidMount()
                        })
                }

                console.log(res)
            })
            .catch(function (error) {
                console.log(error)
            })


    }

    componentDidMount() {
        const lesson2 = []
        axios.get("http://localhost:5000/getAllLessons")
            .then(res => {
                const lessons = res.data
                //console.log(lessons.length)
                for (var i = 0; i < lessons.length; i++) {
                    const lesson = lessons[i]

                    //console.log(lesson)
                    if (!lesson.approved) {
                        lesson2.push(lesson)

                    }
                    this.setState({ approvedLessons: lesson2 })
                    //console.log(lesson2.length)


                }
                this.setState({ approvedLessons: lesson2 })
                console.log(lesson2)

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (

            <div>
                <h4 className="text-center">Unapproved lessons</h4>

                <Table style={{
                    "width": "100%", "borderStyle": "solid", "size": "lg", "background-color": "#C0C0C0"
                }} striped bordered hover responsive="md">
                    <th>Lesson Number</th>
                    <th>Topic</th>
                    <th>level</th>
                    <th>note</th>
                    <th>video link</th>
                    <th>Activity Questions</th>
                    <th>Activity Answers</th>
                    {this.state.approvedLessons.map(approved =>
                        <tr>
                            <td key={approved.id}>{approved.number}</td>
                            <td key={approved.id}>{approved.topic}</td>
                            <td key={approved.id}>{approved.level}</td>
                            <td key={approved.id}>{approved.note}</td>
                            <td key={approved.id}>{approved.videoLink}</td>
                            <td key={approved.id}>{approved.questions}</td>

                            <Button type="submit" onClick={() => this.approve(`${approved._id}`)} className="btnstyle"><td>Approve</td></Button>
                        </tr>
                    )}

                </Table>
            </div >
        )

    }
}