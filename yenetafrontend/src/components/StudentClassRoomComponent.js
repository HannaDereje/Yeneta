import React, {Component } from 'react'
import {Card} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'
import Topic from "./TopicComponent"

export default class ClassRoom extends Component{

    constructor(props)
    {
        super(props)
        this.state = {show: false}

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleShow(){
        this.setState({show: true});
        console.log("hhhfd")
    }

    handleClose(){
        this.setState({show: false});
    }

    render(){
        return (

            <StudentNavBar handleShow ={this.handleShow}>
                <Topic show = {this.state.show} handleShow ={this.handleShow} handleClose={this.handleClose}></Topic>
            <div className="mainContainer bgpic">

                <div id="sidebar">
                    <div className="title">
                        <h4 className="text-center">Lessons</h4>
                    </div>
                    <ul>
                        <li><i ></i>Lesson 1</li>
                        <li>Lesson 2</li>
                        <li>Lesson 2</li>
                        <li>Lesson 3</li>
                    </ul>
                </div>
                <div id="mainpage">
                    <p className="intro">Basic Introduction</p>
                    <div className="note_des divsindedent">
                        <p className="title">Notes</p>
                        <Card>
                        <Card.Body>This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</Card.Body>
                        </Card>

                    </div>
                    <div className="img_des divsindedent">
                        <p className="title">Description With Image</p>
                    <Card className="small">
                        
                        <Card.Img variant="bottom"  src="../images/img1.jpg" />
                        <Card.Body className="img_des_p">
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="note_des divsindedent">
                        <p className="title">Video Lesson</p>
                        <Card>
                        <Card.Body><iframe></iframe></Card.Body>
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