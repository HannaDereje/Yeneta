import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Container, Button, Form, Table } from "react-bootstrap"
export default class Studentlist extends Component {
    constructor() {
        super()
        this.state = {
            approvedLessons: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
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
                    if (lesson.approved) {
                        lesson2.push(lesson)

                    }
                    this.setState({ approvedLessons: lesson2 })
                    //console.log(lesson2.length)


                }
                this.setState({ approvedLessons: lesson2 })


            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Approved lessons</h4>

                <Table>
                    <th>Lesson Number</th>
                    <th>Topic</th>
                    <th>level</th>
                    <th>note</th>
                    <th>video link</th>
                    {this.state.approvedLessons.map(approved =>
                        <tr>
                            <td key={approved.id}>{approved.number}</td>
                            <td key={approved.id}>{approved.topic}</td>
                            <td key={approved.id}>{approved.level}</td>
                            <td key={approved.id}>{approved.note}</td>
                            <td key={approved.id}>{approved.videoLink}</td>

                        </tr>)}

                </Table>
            </div>
        )

    }
}