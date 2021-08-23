import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import axios from "axios"

export default class PasswordResetLink extends Component{

    constructor(props){
        super(props)
        this.state = {

            input:{},
            errors:{},
            accessToken :props.match.params.accessToken
        }

        this.handleChange = this.handleChange.bind(this)
        this.reset = this.reset.bind(this)
        this.validate = this.validate.bind(this)
        console.log(props.match.params.accessToken)
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

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }

        

        if (!input["confirmPassword"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }

        if (typeof input["password"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {
          
            if (input["password"] != input["confirmPassword"]) {
              isValid = false;
              errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
          });
      
        return isValid;


    }

    reset(e){
    
        e.preventDefault();
        if(this.validate()){

            const info = {
                password:this.state.input["password"]
            }


            console.log(info)
            console.log(this.state.accessToken)

            axios.put("http://localhost:5000/reset/" +this.state.accessToken, info, {})
                .then(response=>{
                    console.log(response)

                    if(response.data.message =="Password Reseted"){
                        window.location.href = "/"
                    }
                })

        }

    }

    render(){
        return (

            <div>
                <Container className="conlogin">
                
                    <Form className="loginForm">
                    <h4 className="text-center">Please Reset Your Password</h4>
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name = "password" value = {this.state.input.password} onChange = {this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name = "confirmPassword" value = {this.state.input.confirmPassword} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button variant="success" className="btnStyle2" onClick={this.reset}>Reset</Button>
                        </Form.Group>
                        
                    </Form>
                </Container>
                
            </div>
        )
    }
}