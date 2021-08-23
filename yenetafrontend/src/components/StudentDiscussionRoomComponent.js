import React, {Component } from 'react'
import {Button, InputGroup, Form, FormControl} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import StudentNavBar from "./StudentNavComponent"
import io from 'socket.io-client'

var socket = io.connect("http://localhost:5000")

export default class DiscussionRoom extends Component{

    constructor(props){

        super(props);

        this.state={
            msg:'',
            messages:[],
            like:0,
            report:0
        }

        
        this.getMessage()
        this.onChangeMsg = this.onChangeMsg.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }



    getMessage(){
        
        socket.on("message", message=>{
            
            console.log(message)
        })
        socket.on("chatMessage", message=>{

            this.setState(state=>{
                const messages = state.messages.concat(message)

                return{
                    messages
                }
            })
           
        })

    }
    onChangeMsg(e){
        this.setState({
            msg : e.target.value
        })
    }
   
    sendMessage(event){

        event.preventDefault()

        socket.emit("chatMessage", this.state.msg)

        
         this.setState({
            msg:""
        })

        console.log(this.state.messages)
    }
        
        
    

    render(){
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
                        type="text" placeholder="Message" name ="message" 
                        value={this.state.msg}  onChange={this.onChangeMsg}
                        />
                        <InputGroup.Append>
                        <Button variant="success" type= "submit" onClick={this.sendMessage}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
 
                {this.state.messages.map((msg)=>

                (msg.username) == "Yeneta bot" ?

                <div className="messageStyle" key = {msg.username} >
                <h5 className="usernameStyle">{msg.username}</h5>          
                <p className="textStyle">{msg.text}</p>    
                </div>:<div className="messageStyle" key = {msg.username} >
                <h5 className="usernameStyle">{msg.username}</h5>          
                <p className="textStyle">{msg.text}</p>
                <p className="textStyle">{msg.time}</p>    
                <div className="btnGroupStyle">
                <Button className="btnStyle btn btn-primary"  onClick={() => this.setState({ like: this.state.like + 1 })}>Like {this.state.like}</Button>    
                <Button className="btnStyle btn btn-warning" onClick={() => this.setState({ like: this.state.report + 1 })}>Report {this.state.like}</Button>    
                </div>  
                </div>
                )}     
                </div>
                </div>
                </StudentNavBar>
                
        )
    
    
}


}