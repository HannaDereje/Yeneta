import React, { Component } from 'react'
import { Button, InputGroup, Form, FormControl } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import StudentNavBar from "./StudentNavComponent"


export default class DiscussionRoom extends Component {

    constructor(props) {

        super(props);

        this.state = {
            message: ''
        }
        // this.getMessage()

    }
    /*getMessage(){
        socket.on("message", (x)=>{
            console.log(x)
        })
    }*/






    render() {
        return (
            <StudentNavBar>
                <div className="mainContainer">

                    <div id="sidebar">
                        <div className="title">
                            <h4 className="text-center">Chat Room</h4>
                        </div>
                        <ul>
                            <li>Online Users</li>
                            <li>lorem</li>
                            <li>lorem</li>
                            <li>lorem</li>
                        </ul>
                    </div>
                    <div id="mainpage">


                        <Form className="formStyle">
                            <InputGroup className="mb-3 inputGroupStyle">
                                <FormControl
                                    type="text" placeholder="Message"
                                />
                                <InputGroup.Append>
                                    <Button variant="success">Send</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>

                        <div className="messageStyle">
                            <h5 className="usernameStyle">Username</h5>
                            <p className="textStyle">This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                            <div className="btnGroupStyle">
                                <Button className="btnStyle btn btn-primary">Like</Button>
                                <Button className="btnStyle btn btn-warning">Report</Button>
                            </div>
                        </div>
                        <div className="messageStyle">
                            <h5>Username</h5>
                            <p className="textStyle">This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                            <div className="btnGroupStyle">
                                <Button className="btnStyle btn btn-primary">Like</Button>
                                <Button className="btnStyle btn btn-warning">Report</Button>
                            </div>
                        </div>
                        <div className="messageStyle">
                            <h5>Username</h5>
                            <p className="textStyle">This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                            <div className="btnGroupStyle">
                                <Button className="btnStyle btn btn-primary">Like</Button>
                                <Button className="btnStyle btn btn-warning">Report</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </StudentNavBar>

        )


    }


}