import React, { Component } from 'react'
import { Button, InputGroup, Form, FormControl } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import StudentNavBar from "./StudentNavComponent"
import io from 'socket.io-client'


var socket = io.connect("http://localhost:5000")

export default class DiscussionRoom extends Component {

    constructor(props) {

        super(props);

        this.state = {
            msg: ''
        }


        this.getMessage()
        this.onChangeMsg = this.onChangeMsg.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.outputMessage = this.outputMessage.bind(this)
    }
    getMessage() {

        socket.on("message", message => {
            console.log(message.username)
            this.outputMessage(message)
        })
        socket.on("chatMessage", message => {
            console.log(message)
            this.outputMessage(message)
        })

    }
    onChangeMsg(e) {
        this.setState({
            msg: e.target.value
        })
    }
    outputMessage(message) {
        console.log(message)
        return (<div className="messageStyle">
            <h5 className="usernameStyle">{message.username}</h5>
            <p className="textStyle">{message.text}</p>
            <div className="btnGroupStyle">
                <Button className="btnStyle btn btn-primary">Like</Button>
                <Button className="btnStyle btn btn-warning">Report</Button>
            </div>
        </div>)

    }
    sendMessage(event) {

        event.preventDefault()

        socket.emit("chatMessage", this.state.msg)

        this.setState({
            msg: ""
        })
    }




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
                                    type="text" placeholder="Message" name="message"
                                    value={this.state.msg} onChange={this.onChangeMsg}
                                />
                                <InputGroup.Append>
                                    <Button variant="success" type="submit" onClick={this.sendMessage}>Send</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <InputGroup className="mb-3 inputGroupStyle">
                                <FormControl
                                    type="text" placeholder="Message" name="message"
                                    value={this.state.msg} onChange={this.onChangeMsg}
                                />
                                <InputGroup.Append>
                                    <Button variant="success" type="submit" onClick={this.sendMessage}>Send</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                        <this.outputMessage />

                    </div>
                </div>
            </StudentNavBar>

        )


    }


}