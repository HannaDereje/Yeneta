import React, {Component } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

export default class TopicCreate extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{},
        }

        this.handleChange = this.handleChange.bind(this)
        this.add = this.add.bind(this)
    }

    handleChange(e){

        let input = this.state.input;
        input[e.target.name] = e.target.value;
        
        this.setState({
            input:input
        })
    }

    add(e){

        e.preventDefault();
        if(this.validate()){


            const info={
                topic:this.state.input.topic
            }

            const header ={
                "x-access-token": localStorage.getItem("token")
            }

            axios.post("http://localhost:5000/insertTopic",info)
            .then(response=>{
                console.log(response)
    
            })
            .catch((error)=>
                console.log(error)
            )
            let input = {};
            input["topic"] = "";
            this.setState({input:input});

    }

        }

    


    validate(){

        let input = this.state.input;
        let errors ={}
        let isValid = true;

        if(!input["topic"]){
            isValid = false;
            errors["question"] = "Please enter your Question please.";
        }

        this.setState({
            errors: errors
          });
      
        return isValid;

    }

    render(){
        return (
            <div>
                <h4 className="text-center">Topic Form</h4>
                <div className = "lessonstyle">
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Topic Name</Form.Label>
                            <Form.Control type="text" placeholder="Topic Name"  name ="topic" value = {this.state.input.topic} onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.topic}</div>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle" onClick={this.add}>Add Topic</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )

    }
}