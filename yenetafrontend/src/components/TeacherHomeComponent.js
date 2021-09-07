import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import TeacherNavBar from "./TeacherNavComponent"
import '../css/register.css'
import Lessons from "./LessonsComponent"
import TeachersLessons from "./TeachersLessons"
import TeachersQuizes from "./TeachersQuizes"
import Questions from "./QuestionAnswerComponent"
import Exam from "./MonthlyExamComponent"
import axios from "axios"
import TopicCreate from './CreateTopicComponent'
export default class TeacherHome extends Component {

    constructor(props) {
        super(props);
        this.state = { lessons: false };
        this.state = { quizes: false };
        this.state = { topics: false };
        this.state = { questionAnswer: false };
        this.state = { newLesson: false }
        this.state = { newQuiz: false }
        this.state = { newTopic: false }
        this.state = { user: {} }

        this.handleLessonsClick = this.handleLessonsClick.bind(this)
        this.handleQuizesClick = this.handleQuizesClick.bind(this)
        this.handleQuestionAnswersClick = this.handleQuestionAnswersClick.bind(this)
        this.handleTopicsClick = this.handleTopicsClick.bind(this)


        this.handleNewQuizesClick = this.handleNewQuizesClick.bind(this)
        this.handleNewLessonsClick = this.handleNewLessonsClick.bind(this)
        this.handleNewTopicsClick = this.handleNewTopicsClick.bind(this)
        this.resetClicks = this.resetClicks.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
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
    handleLessonsClick() {
        this.resetClicks();
        this.setState({ lessons: true })

    }

    handleQuizesClick() {
        this.resetClicks();
        this.setState({ quizes: true })

    }

    handleQuestionAnswersClick() {
        this.resetClicks();
        this.setState({ questionAnswer: true });

    }
    handleTopicsClick() {
        this.resetClicks();


    }

    handleNewQuizesClick() {
        this.resetClicks();
        this.setState({ newQuiz: true });

    }

    handleNewLessonsClick() {
        this.resetClicks();
        this.setState({ newLesson: true });
        console.log(this.state.newLesson)
    }
    handleNewTopicsClick() {
        this.resetClicks();
        this.setState({ newTopic: true });
        console.log(this.state.newLesson)
    }

    resetClicks() {
        this.setState({
            lessons: false,
            quizes: false,
            topics: false,
            questionAnswer: false,
            newLesson: false,
            newQuiz: false,
            newTopic: false
        })
    }

    render() {
        return (
            <div>

                <TeacherNavBar user={this.state.user.username} handleNewTopicsClick={this.handleNewTopicsClick} handleNewLessonsClick={this.handleNewLessonsClick} handleNewQuizesClick={this.handleNewQuizesClick}>

                    <div id="sidebar">
                        <div className="title">
                        </div>
                        <ul>
                            <li onClick={this.handleLessonsClick}>Lessons</li>
                            <li onClick={this.handleQuizesClick}>Quizes</li>
                            <li onClick={this.handleQuestionAnswersClick}>Question And Answer</li>
                            <li onClick={this.handleTopicsClick}>Topics</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                    <div id="mainpage">

                        {this.state.lessons ? <TeachersLessons></TeachersLessons> : ""}
                        {this.state.quizes ? <TeachersQuizes></TeachersQuizes> : ""}
                        {this.state.questionAnswer ? <Questions></Questions> : ""}
                        {this.state.newLesson ? <Lessons></Lessons> : ""}
                        {this.state.newQuiz ? <Exam></Exam> : ""}
                        {this.state.newTopic ? <TopicCreate></TopicCreate> : ""}
                    </div>
                </TeacherNavBar>
            </div>

        )
    }

}