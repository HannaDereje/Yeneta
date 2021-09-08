import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import AdminNavBar from "./AdminNavComponent"
import '../css/register.css'
import Studentlist from "./StudentsListComponent"
import Teacherlist from "./TeacherListComponent"
import ApprovedLessons from "./ApprovedLessons"
import UnapprovedLessons from "./UnapprovedLessons"
import UnapprovedQuizes from "./UnapprovedQuizes"
import ApprovedQuizes from "./ApprovedQuizes"
import Lessons from "./LessonsComponent"
import Spring from 'react-spring'
import axios from 'axios'
export default class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.state = { students: false };
        this.state = { teachers: false };
        this.state = { approvedLessons: false };
        this.state = { approvedQuizes: false };
        this.state = { unapprovedLessons: false };
        this.state = { unapprovedQuizes: false };

        this.handleStudentsClick = this.handleStudentsClick.bind(this)
        this.handleTeachersClick = this.handleTeachersClick.bind(this)
        this.handleApprovedLessonsClick = this.handleApprovedLessonsClick.bind(this)
        this.handleApprovedQuizesClick = this.handleApprovedQuizesClick.bind(this)
        this.handleUnApprovedLessonsClick = this.handleUnApprovedLessonsClick.bind(this)
        this.handleUnApprovedQuizesClick = this.handleUnApprovedQuizesClick.bind(this)
        this.resetClicks = this.resetClicks.bind(this)
    }

    handleStudentsClick() {
        this.resetClicks();
        this.setState({ students: true });

    }

    handleTeachersClick() {
        this.resetClicks();
        this.setState({ teachers: true });

    }

    handleApprovedLessonsClick() {
        this.resetClicks();
        this.setState({ approvedLessons: true });

    }

    handleApprovedQuizesClick() {
        this.resetClicks();
        this.setState({ approvedQuizes: true });

    }

    handleUnApprovedLessonsClick() {
        this.resetClicks();
        this.setState({ unapprovedLessons: true });

    }

    handleUnApprovedQuizesClick() {
        this.resetClicks();
        this.setState({ unapprovedQuizes: true });

    }

    resetClicks() {
        this.setState({
            students: false,
            teachers: false,
            approvedLessons: false,
            approvedQuizes: false,
            unapprovedLessons: false,
            unapprovedQuizes: false
        })
    }

    render() {
        return (
            <div>

                <AdminNavBar></AdminNavBar>

                <div id="sidebar">
                    <div className="title">
                    </div>
                    <ul>
                        <li onClick={this.handleStudentsClick}>Students</li>
                        <li onClick={this.handleTeachersClick}>Teachers</li>
                        <li onClick={this.handleApprovedLessonsClick}>Approved Lessons</li>
                        <li onClick={this.handleApprovedQuizesClick}>Approved Quizes</li>
                        <li onClick={this.handleUnApprovedLessonsClick}>UnApproved Lessons</li>
                        <li onClick={this.handleUnApprovedQuizesClick}>UnApproved Quizes</li>
                        <li>Logout</li>
                    </ul>
                </div>
                <div id="mainpage">
                    {this.state.students ? <Studentlist></Studentlist> : ""}

                    {this.state.teachers ? <Teacherlist></Teacherlist> : ""}
                    {this.state.approvedLessons ? <ApprovedLessons></ApprovedLessons> : ""}
                    {this.state.approvedQuizes ? <ApprovedQuizes></ApprovedQuizes> : ""}
                    {this.state.unapprovedLessons ? <UnapprovedLessons></UnapprovedLessons> : ""}
                    {this.state.unapprovedQuizes ? <UnapprovedQuizes></UnapprovedQuizes> : ""}


                </div>

            </div>
        )
    }

}