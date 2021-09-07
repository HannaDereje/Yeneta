import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Container, Jumbotron, Button, Form, Table } from "react-bootstrap"
import '../css/register.css';
export default class TeachersLessons extends Component {
    constructor() {
        super()
        this.state = {
            quizes: [],
            lesson: [],
            questions2: []

        }
        this.componentDidMount = this.componentDidMount.bind(this)


    }

    componentDidMount() {
        const header = {
            "x-access-token": localStorage.getItem("token")
        }
        const ids2 = []

        axios.get(`http://localhost:5000/getProfile`, { headers: header })
            .then(res => {
                //this.setState({ quizes: res.data.contentManager.quizes })
                console.log(res.data)
                console.log(res.data.contentManager.quizes[0])
                console.log(ids2[0])
                for (var i = 0; i < res.data.contentManager.quizes.length; i++) {
                    // console.log(ids2[i])


                    axios.get(`http://localhost:5000/getLesson/${res.data.contentManager.lessons[i]}`)
                        .then(res => {
                            console.log(res.data)
                            this.setState({
                                lesson: this.state.lesson.concat(res.data)
                            })
                            //console.log(this.state.quiz)
                            this.state.lesson.forEach(element => {
                                axios.post(`http://localhost:5000/getManyQs`, { ids: element.questions })
                                    .then(res => {
                                        var questions = []
                                        questions.push(res.data)
                                        this.setState({
                                            questions2: this.state.questions2.concat(questions)
                                        })
                                        console.log(this.state.questions2)
                                    })
                            })

                        })

                }
            })
    }
    render() {

        return (
            <div>
                {this.state.lesson.map(lesson => {

                    <Table>
                        <tr>
                            <td>{lesson.topic}</td>
                            <td>{lesson.note}</td>
                            <td>{lesson.level}</td>
                            <td>{lesson.videoLink}</td>
                        </tr>

                    </Table>



                })}
            </div>

        )



    }
}