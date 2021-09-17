import React, {Component } from 'react'
import {Button, InputGroup, Form, FormControl} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import StudentNavBar from "./StudentNavComponent"
import io from 'socket.io-client'
import axios from "axios"
import moment from "moment"
import Topic from './TopicComponent'
import {useHistory} from "react-router-dom";


var socket = io("http://localhost:5000", {transports:["websocket"], upgrade:false})

export default class DiscussionRoom extends Component{

    constructor(props){

        super(props);

        this.state={
            msg:'',
            messages:[],
            like:0,
            report:0,
            users:[],
            sentTopic:"",
            topic : new URLSearchParams(this.props.location.search).get('topic'),
            username : new URLSearchParams(this.props.location.search).get('username'),
            id : new URLSearchParams(this.props.location.search).get('id'),
            time:"",
            likedMessage:"",
            noSpareTime:'',
            now:"",
            user:''

        }

        console.log(this.state.id)        
        this.getMessage()
        this.onChangeMsg = this.onChangeMsg.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.onchangeLike = this.onchangeLike.bind(this)
        this.onchangeReport = this.onchangeReport.bind(this)
        this.compareAllowedWithNow = this.compareAllowedWithNow.bind(this)
    }



    getMessage(){

        console.log()

        const username = this.state.username
        const topic = this.state.topic
        const id = this.state.id

        socket.emit("joinroom", {username, topic, id})
        
        socket.once("TopicUsers", ({topic, users})=>{

            this.setState({
                users:users,
                sentTopic:topic
            })

            console.log(users)

        })

       
        socket.on("message", message=>{
            console.log(message.like)
            
            this.setState(state=>{
                const messages = state.messages.concat(message)
                return{
                    messages
                }  
            })
            console.log(this.state.messages)

        })
        socket.on("chatMessage", message=>{

            this.setState(state=>{
                const messages = state.messages.concat(message)

                return{
                    messages
                }
            })
           
        })

        socket.on("likedMessage", ({})=>{
          
            window.location.reload();
            
        })
        socket.on("reportedMessage", ({report, leave})=>{
          
            if(leave == true){
               this.props.history.goBack() 
            }
            window.location.reload();

            
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

    onchangeLike(id){

        socket.emit("likedMessage", {id})
        
    }

    onchangeReport(id){

        socket.emit("reportedMessage",  {id})

        

    }

    


    handleShow(){
        window.location.href = "/classroom"
    }

    compareAllowedWithNow(){

        if(this.state.allowedTime !== ""){

      
            var count = moment().format('hh:mm a')
            var time = moment().add(15, 'minutes').format('hh:mm a')

             var timer = setInterval(() => {

                  count = moment().format('hh:mm a')
                  var x = moment.utc(moment(time, "HH:mm:ss").diff(moment(count, "HH:mm:ss"))).format("mm")
                  this.setState({now:x})
                  
                  if(x == 0){

                    axios.delete("http://localhost:5000/deleteRoom")
                        .then(room=>{

                            axios.delete("http://localhost:5000/deleteMessages")
                                 .then(msgs=>{
                                    this.setState({noSpareTime:"Time is up!!"})
                                    alert("Time is up")
                                    clearInterval(timer)
                                    
                                    useHistory().goBack()
                                 })
                        })
                }

                else if(this.state.users.length ==0){
                    axios.delete("http://localhost:5000/deleteRoom")
                    .then(room=>{

                        axios.delete("http://localhost:5000/deleteMessages")
                             .then(msgs=>{
                                this.setState({noSpareTime:"Time is up!!"})
                                alert("Time is up")
                                clearInterval(timer)
                                
                                useHistory().goBack()
                             })
                    })
                }
             }, 1000);
            

            
        }
    }

    componentDidMount(){

        this.compareAllowedWithNow()

        const header ={
            "x-access-token": localStorage.getItem("token")
        }

        axios.get("http://localhost:5000/getStudent",  {headers:header})
                    .then(response=>{
                        this.setState({user:response.data.Student})
                        console.log(response.data)
                    })
    }
        

    render(){
        return (
            <StudentNavBar name = "Leave Chat" handleShow={this.handleShow} image ={"http://localhost:5000/"+ this.state.user.image}>
            <div className="mainContainer">

                <div id="sidebar">
                    <div className="title">
                        <h4 className="text-center">Chat Room</h4>
                    </div>   
                    <ul>
                    {this.state.users.map((list)=>     
                        <li>{list.username}</li>
                    )}
                    </ul>
                </div>
                <div id="mainpage">

                <h6>You have {this.state.now} minutes left.</h6>
                    
                    
 
                {this.state.messages.map((msg)=>
                

                (msg.username) == "Yeneta bot" ?

                <div className="messageStyle" key = {msg.username} >
                <h5 className="usernameStyle">{msg.username}</h5>          
                <p className="textStyle">{msg.text}</p>    
                </div>:<div className="messageStyle" key = {msg.username} >
                <p className="usernameStyle">{msg.username}</p>          
                <h5 className="textStyle">{msg.text}</h5>
                <p className="textStyle">{msg.time}</p>    
                <div className="btnGroupStyle">
                <Button className="btnStyle btn btn-primary" onClick={()=>this.onchangeLike(msg.id)} >Like {msg.like}</Button>    
                <Button className="btnStyle btn btn-warning" onClick={()=>this.onchangeReport(msg.id)} >Report {msg.report}</Button>    
                </div>  
                </div>
                )}  


                <Form className="formStyle msgbox">
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
                </div>

                </div>
                </StudentNavBar>
                
        )
    
    
}


}