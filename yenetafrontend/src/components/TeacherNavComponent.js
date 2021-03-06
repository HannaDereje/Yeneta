import React, { Component } from 'react'
import { Navbar, Nav } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

export default class TeacherNavBar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <div>
                <Navbar sticky="top" variant="dark" className="navStyle">
                    <Navbar.Brand href="/" className="brand">Yeneta/የኔታ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="floatright">
                            <Nav.Link href="" className="mr-3 lessonlink" onClick={this.props.handleNewLessonsClick} >Add New Lesson</Nav.Link>
                            <Nav.Link href="" className="mr-3 quizlink" onClick={this.props.handleNewQuizesClick} >Add New Quiz</Nav.Link>
                            <Nav.Link href="" className="mr-3" href="/teacherProfile"><img src="../images/img2.jpg" width="40" height="40" className="imgStyle" /></Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

                <div>{this.props.children}</div>
            </div>
        )
    }
}