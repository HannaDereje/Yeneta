import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'
import axios from 'axios'


export default class TeacherRegister extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{}
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerTeacher = this.registerTeacher.bind(this)
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

        if(!input["name"]){
            isValid = false;
            errors["name"] = "Please enter your name.";
        }

        if(!input["username"]){
            isValid = false;
            errors["username"] = "Please enter your username.";
        }

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

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }

        

        if (!input["confirmPassword"]) {
            isValid = false;
            errors["confirmPassword"] = "Please enter your password.";
          }

        if (typeof input["password"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {
          
            if (input["password"] != input["confirmPassword"]) {
              isValid = false;
              errors["password"] = "Passwords don't match.";
            }
        }

        if (!input["job"]) {
            isValid = false;
            errors["job"] = "Please enter your job.";
          }

        

        if (!input["experience"]) {
            isValid = false;
            errors["experience"] = "Please enter your experiance.";
          }
          this.setState({
            errors: errors
          });
      
        return isValid;
    }

    registerTeacher(e){
    
        e.preventDefault();
        if(this.validate()){

            const info = {
                name :this.state.input["name"],
                username :this.state.input["username"],
                email:this.state.input["email"],
                job:this.state.input["job"],
                experience :this.state.input["experience"],
                password:this.state.input["password"]
            }

            console.log(info)

        
            axios.post("http://localhost:5000/teacher_register", info)
            .then(res => {
                console.log(res);
                alert("Please confirm us on your email")
                    window.location.href="/studentLogin"
            })


                let input = {};
            input["name"] = "";
            input["username"] = "";
            input["email"] = "";
            input["job"] = "";
            input["experiance"] = "";
            input["password"] = "";
            input["confirmPassword"] = "";
            this.setState({input:input});

        }else{
            console.log("invalid Inputs")
            console.log(this.state.errors)
        }
    }

    render(){
        return (

            <div>
              
              <HomeNavbar>
                <Container fluid className="conreg">
                    
                    <Form className="registerForm">
                    <h4 className="text-center ">Teacher Registration Form</h4>

                    
                        <Form.Group className="form_width">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" name = "name" value={this.state.input.name} onChange={this.handleChange} className="inputStyle"/>
                            <div className="text-danger">{this.state.errors.name}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name = "username"  value={this.state.input.username} onChange={this.handleChange} className="inputStyle" />
                            <div className="text-danger">{this.state.errors.username}</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="form_width">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="someone@gmail.com" name = "email" value={this.state.input.email} onChange={this.handleChange}  className="inputStyle"/>
                            <div className="text-danger">{this.state.errors.email}</div>
                        </Form.Group>
                        
                        <Form.Group  className="form_width">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" className="inputStyle" name = "job" value={this.state.input.job} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.job}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Experiance</Form.Label>
                            <Form.Control type="text" className="inputStyle" name = "experience" value={this.state.input.experience} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.experiance}</div>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name= "password" className="inputStyle" value={this.state.input.password} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.password}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name = "confirmPassword" className="inputStyle" value={this.state.input.confirmPassword} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.confirmPassword}</div>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle" onClick={this.registerTeacher}>Register</Button>
                        </Form.Group>
                    </Form>
                </Container>
                
               </HomeNavbar>
            </div>
        )
    }
}