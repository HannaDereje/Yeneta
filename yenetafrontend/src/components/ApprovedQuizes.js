import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Card, Container, Button, Form, Table, ListGroup } from "react-bootstrap"
import { left } from '@popperjs/core';
import '../css/register.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default class UnapprovedQuizes extends Component {
    constructor() {
        super()
        this.state = {
            approvedQuizes: [],
            questions2: [],


        }
        this.approve = this.approve.bind(this)
        this.getQuizes = this.getQuizes.bind(this)
        this.resetClicks = this.resetClicks.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    async approve(id) {
        console.log(id)
        axios.get(`http://localhost:5000/getQuiz/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.approved == false) {
                    axios.put(`http://localhost:5000/approveQuiz/${id}`)
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
    resetClicks() {
        this.setState({

            questions2: []
        })
    }
    getQuizes() {
        var quiz2 = []
        const qs = []
        const qs2 = []
        const ids = []
        const header = {
            "x-access-token": localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/getAllQuizes", {})
            .then(res => {
                console.log(res.data)
                const quizes = res.data
                for (var i = 0; i < quizes.length; i++) {
                    var quiz = quizes[i]


                    if (quiz.approved) {
                        quiz2.push(quiz)
                        // console.log(quiz2)
                    }

                }
                this.setState({ approvedQuizes: quiz2 })
                this.state.approvedQuizes.forEach(element => {
                    axios.post(`http://localhost:5000/getManyQs`, { ids: element.questions })
                        .then(res => {
                            var questions = []
                            var questions3 = []
                            questions.push(res.data)

                            this.setState({
                                questions2: this.state.questions2.concat(questions)
                            })
                            // console.log(this.state.questions2)
                        })
                })


            })
            .catch(function (error) {
                console.log(error)
            })
    }


    componentDidMount() {
        //this.resetClicks()
        this.getQuizes()
    }

    render() {
        console.log(this.state.approvedQuizes)
        return (

            <div>
                <h4 className="text-center">Approved Quizes</h4>

                <div>
                {this.state.questions2.map(question => {
                    return (
                        <div className ="unapprovals top">
                            {question.map((qu2, i) => {
                                return (

                                    <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Lesson {qu2.level}</Card.Title>
                                       
                                        <Card.Body>
                                        <CKEditor
                                            key={qu2._id}
                                            data={qu2.content}
                                            disabled={true}
                                            editor={ClassicEditor}
                                            config={{
                                                isReadOnly: true,
                                                toolbar: ['']
                                            }}
            
            
                                        />

                                            </Card.Body>
                                            <Card.Text>
                                                <p>{qu2.answer} Level</p>
                                            </Card.Text>
                                            <Button variant="primary" type="submit" onClick={() => this.approve()} >Approve</Button>
                                        </Card.Body>
                                        </Card>
                                    )

                            })}
                           
                                </div>
                    )
                })}
                </div>
            </div >
        )
    }

}
