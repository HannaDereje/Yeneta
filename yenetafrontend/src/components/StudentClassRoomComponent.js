import React, { Component } from 'react'
import { Card } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'
import Topic from "./TopicComponent"
import axios from "axios"
import Lessons from './LessonsComponent';

export default class ClassRoom extends Component {

    constructor() {
        super()
        this.state = {
            lesson: false,
            les: "",
            lessons: []
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getOne = this.getOne.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.resetClicks = this.resetClicks.bind(this)
        this.handleLessonsClick = this.handleLessonsClick.bind(this)
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

                this.setState({ les: res.data })
                console.log(res.data)

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {

        return (

            <StudentNavBar handleShow={this.handleShow}>
                <Topic show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose}></Topic>
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
                        <p className="intro">Basic Introduction</p>
                        <div className="note_des divsindedent">
                            <p className="title">Notes</p>

                            <Card>

                                <Card.Body key={this.state.les._id}>{this.state.les.note}</Card.Body>

                            </Card>

                        </div>
                        <div className="img_des divsindedent">
                            <p className="title">Description With Image</p>
                            <Card className="small">

                                <Card.Img variant="bottom" src={this.state.les.image} />
                                <Card.Body className="img_des_p">
                                    {this.state.les.imageDescription}
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="note_des divsindedent">
                            <p className="title">Video Lesson</p>
                            <Card>
                                <Card.Body>

                                    <iframe width="420" height="315" src={this.state.les.videoLink} frameborder="0" allowfullscreen></iframe>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="note_des divsindedent">
                            <p className="title">Today's Vocabulary</p>
                            <Card>
                                <Card.Body>This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</Card.Body>
                            </Card>
                        </div>

                        <div className="note_des divsindedent">
                            <p className="title">Today's Activity</p>
                            <Card>
                                <Card.Body>This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</Card.Body>
                            </Card>
                        </div>

                    </div>

                </div>
            </StudentNavBar>
        )

    }

}
