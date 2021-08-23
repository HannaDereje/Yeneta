import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import axios from "axios"

export default class ResetPassword extends Component{
    constructor(){
        super()
        this.state = {

            input:{},
            errors:{}
        }

        this.handleChange = this.handleChange.bind(this)
        this.done = this.done.bind(this)
        this.validate = this.validate.bind(this)
    }

    handleChange(e){

        let input = this.state.input;
        input[e.target.name] = e.target.value;
        
        this.setState({
            input:input
        })
    }

    validate(){

        let input = this.state.input;
        let errors ={}
        let isValid = true;

        if(!input["email"]){
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if(typeof input["email"] !== "undefined"){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
              isValid = false;
              errors["email"] = "Please enter valid email address.";
            }
        }
        this.setState({
            errors: errors
          });
      
        return isValid;

    }

    done(e){
    
        e.preventDefault();
        if(this.validate()){

            const info = {
                email:this.state.input["email"]
            }

            console.log(info)

            axios.post("http://localhost:5000/forwardToEmail", info, {})
                .then(response=>{
                    console.log(response)

                })

        }

    }

    render(){
        return (

            <div>
                <Container className="conlogin">
                   
                
                    <Form className="loginForm">
                    <h4 className="text-center">Password Reset Page</h4>
                        <Form.Group controlId="formBasicEmail" className="form_width">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Someone@gmail.com" name = "email" value={this.state.input.email} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button variant="success" className="btnStyle2" onClick={this.done}>Done</Button>
                        </Form.Group>
                        
                    </Form>
                </Container>
                
            </div>
        )
    }
}