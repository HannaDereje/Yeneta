import React, { Component } from 'react'
import { Card } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'
import { Button, Form } from "react-bootstrap"
import Topic from "./TopicComponent"
import axios from "axios"
import Lessons from './LessonsComponent';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default class ClassRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lesson: false,
            les: "",
            activity: "",
            questions2: [],
            lessons: [],
            value: "",
            answers: [],
            result: "",
            total: ""
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getOne = this.getOne.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.resetClicks = this.resetClicks.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleLessonsClick = this.handleLessonsClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(i, e) {
        let answers = [...this.state.answers]
        answers[i] = e.target.value
        this.setState({ answers })
    }
    onSubmit(e) {



        e.preventDefault()
        let j = 0
        console.log(this.state.answers)
        let a1 = this.state.answers
        for (var i = 0; i < this.state.questions2.length; i++) {

            //const answer = this.state.answers["answers"]
            // this.state.answers.push(answer)
            let a2 = this.state.questions2[i].answer
            console.log(a2)
            if (a1[i] == a2) {
                j = j + 1
                if (j == this.state.questions2.length) {
                    this.setState({
                        comment: "Excellent/እጅግ በጣም ጥሩ"

                    })

                }

            }
            // console.log(j)
        }
        this.setState({
            result: j,
            total: this.state.questions2.length



        })
    }

    componentDidMount() {
        const lesson2 = []
        axios.get("http://localhost:5000/getAllLessons")
            .then(res => {
                const lesssons = res.data
                for (var i = 0; i < lesssons.length; i++) {
                    const alesson = lesssons[i]
                    if (alesson.level == "Intermediate") {
                        lesson2.push(alesson)

                        //console.log(alesson)
                    } this.setState({ lessons: lesson2 })
                } this.setState({ lessons: lesson2 })


            })
            .catch(function (error) {
                console.log(error)
            })
    }
    resetClicks() {
        this.setState({

            les: ""
        })
    }
    handleLessonsClick(id) {
        //this.componentDidMount()
        this.resetClicks();
        this.getOne(id)

    }


    handleShow() {
        this.setState({ show: true });
        console.log("hhhfd")
    }

    handleClose() {
        this.setState({ show: false });
    }
    getOne(id) {
        //console.log(id)

        axios.get(`http://localhost:5000/getLesson/${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({ les: res.data })

                axios.get(`http://localhost:5000/getActivity/${res.data.activity}`)
                    .then(res => {
                        //  console.log(res)
                        res.data.due_date = new Date(res.data.due_date).toDateString()
                        this.setState({ activity: res.data })
                        //console.log(res.activity)

                        const questions = []
                        // console.log(res.data.questions.length)
                        for (let i = 0; i < res.data.questions.length; i++) {

                            axios.get(`http://localhost:5000/getQuestion/${res.data.questions[i]}`)
                                .then(res => {
                                    //  console.log(res.data)
                                    questions.push(res.data)
                                    // this.setState((prev)=>({ questions: [...prev, res.data ]}))
                                    // console.log(res.data)
                                    this.setState({ questions2: questions })
                                })

                        }
                        //this.setState({ questions2 })

                        //console.log(this.state.questions2)
                    })




            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (

            <StudentNavBar handleShow={this.handleShow}>

                <div className="mainContainer bgpic">

                    <div id="sidebar">
                        <div className="title">
                            <h4 className="text-center">Lessons</h4>
                        </div>
                        {this.state.lessons.map(lesson =>
                            <ul>

                                <li onClick={() => this.handleLessonsClick(lesson._id)} >Lesson {lesson.number}</li>

                            </ul>)}
                    </div>

                    <div id="mainpage">

                        <p className="topic" key={this.state.les._id}>{this.state.les.topic}</p>
                        <div className="note_des divsindedent">
                            <p className="title">Notes</p>
                            <CKEditor
                                key={this.state.les._id}
                                data={this.state.les.note}
                                disabled={true}
                                editor={ClassicEditor}
                                config={{
                                    isReadOnly: true,
                                    toolbar: ['']
                                }}


                            />



                        </div>

                        <div className="note_des divsindedent">
                            <p className="title">Video Lesson</p>
                            <Card>
                                <Card.Body key={this.state.les._id}>

                                    <iframe X-Frame-Options="sameorigin" src={this.state.les.videoLink} frameborder="0" allowfullscreen></iframe>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="note_des divsindedent">
                            <p className="title">Today's Activity</p>
                            <Form.Label className="topic2">Due Date = {this.state.activity.due_date} </Form.Label>
                            <hr />



                            {this.state.questions2.map((e1, i) =>
                                <Form.Group>
                                    <CKEditor
                                        data={e1.content}
                                        editor={ClassicEditor}
                                        disabled={true}
                                        config={{
                                            isReadOnly: true,
                                            toolbar: ['']
                                        }}

                                    />
                                    <br />
                                    <input type="text" onChange={this.handleChange.bind(this, i)} placeholder="answer" />
                                    <br /><br />
                                </Form.Group>
                            )}
                            <br />
                            <Button type="submit" onClick={this.onSubmit} className="btnstyle">Submit</Button>
                            <br /><br />
                            <div className="text-danger">{this.state.result}/{this.state.total}</div>
                            <div className="text-danger">{this.state.comment}</div>
                        </div>

                    </div>

                </div>
            </StudentNavBar>
        )

    }

}
