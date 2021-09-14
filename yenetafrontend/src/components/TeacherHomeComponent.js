import React, {Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import  TeacherNavBar from "./TeacherNavComponent"
import '../css/register.css'
import Lessons from "./LessonsComponent"
import Questions from "./QuestionAnswerComponent"
import Exam from "./MonthlyExamComponent copy"
import TopicCreate from './CreateTopicComponent'
import TeachersLessons from "./TeachersLessons"
import TeachersQuizes from "./TeachersQuizes"

export default class TeacherHome extends Component{

    constructor(props)
    {
        super(props);
        this.state = {lessons: false};
        this.state = {quizes: false};
        this.state = {questionAnswer: false};
        this.state = {newLesson :false}
        this.state = {newQuiz :false}
        this.state = {newTopic :false}

        this.handleLessonsClick = this.handleLessonsClick.bind(this)
        this.handleQuizesClick = this.handleQuizesClick.bind(this)
        this.handleQuestionAnswersClick = this.handleQuestionAnswersClick.bind(this)
        this.handleNewTopicClick = this.handleNewTopicClick.bind(this)

        
        this.handleNewQuizesClick = this.handleNewQuizesClick.bind(this)
        this.handleNewLessonsClick = this.handleNewLessonsClick.bind(this)

        this.resetClicks = this.resetClicks.bind(this)
    }

    handleLessonsClick() {
        this.resetClicks();
        this.setState({lessons: true});
        
    }

    handleQuizesClick() {
        this.resetClicks();
        this.setState({quizes: true});
        
    }

    handleNewTopicClick() {
        this.resetClicks();
        this.setState({newTopic: true});
        
    }

    handleQuestionAnswersClick() {
        this.resetClicks();
        this.setState({questionAnswer: true});
        
    }

    handleNewQuizesClick() {
        this.resetClicks();
        this.setState({newQuiz: true});
        
    }

    handleNewLessonsClick() {
        this.resetClicks();
        this.setState({newLesson: true});
        console.log(this.state.newLesson)
    }
    logout(){

        localStorage.clear();
        window.location.href = "/studentLogin";

    }

    resetClicks(){
        this.setState({
            lessons: false, 
            quizes: false, 
            questionAnswer:false,
            newLesson:false,
            newQuiz:false,
            newTopic:false
        })
    }

    componentDidMount(){

    }

    render(){
        return (
            <div>

                <TeacherNavBar handleNewLessonsClick ={this.handleNewLessonsClick} handleNewQuizesClick = {this.handleNewQuizesClick}>

                <div id="sidebar">
                    <div className="title">
                    </div>
                    <ul>
                        <li onClick={this.handleLessonsClick}>Lessons</li>
                        <li onClick={this.handleQuizesClick}>Quizes</li>
                        <li onClick={this.handleQuestionAnswersClick}>Question And Answer</li>                       
                        <li onClick={this.handleNewTopicClick}>Topic</li>
                        <li onClick={this.logout}>Logout</li>
                    </ul>
                </div>
                <div id="mainpage">
                {this.state.lessons ?<TeachersLessons></TeachersLessons> : ""}
                {this.state.questionAnswer ?<Questions></Questions> : ""}
                {this.state.quizes ?<TeachersQuizes></TeachersQuizes> : ""}
                {this.state.newLesson ? <Lessons></Lessons> :""} 
                {this.state.newQuiz ? <Exam></Exam> :""}   
                {this.state.newTopic ? <TopicCreate></TopicCreate> :""}   
                    </div>
                    </TeacherNavBar>
            </div>
            
        )
    }

}