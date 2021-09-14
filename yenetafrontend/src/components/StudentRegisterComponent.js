import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'
import axios from "axios"


export default class StudentRegister extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{}
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerStudent = this.registerStudent.bind(this)
        this.validate = this.validate.bind(this)
    }

    handleChange(e){

        let input = this.state.input;

        
      
        if(e.target.name === "image"){
            input[e.target.name] = e.target.files[0];
            console.log(e.target.files[0])
        }else{
        input[e.target.name] = e.target.value;
        console.log()
        }
        this.setState({
            input
        })
    }


    registerStudent(e){
    
        e.preventDefault();
        if(this.validate()){

            const info = {
                name :this.state.input["name"],
                username :this.state.input["username"],
                email:this.state.input["email"],
                age:this.state.input["age"],
                country :this.state.input["country"],
                password:this.state.input["password"],
                image:this.state.input["image"]
            }

            const formData = new FormData();
            formData.append('name', info.name);        
            formData.append('username', info.username);
            formData.append('email', info.email);        
            formData.append('age', info.age);
            formData.append('country', info.country);        
            formData.append('password', info.password);
            formData.append('image', info.image);

            console.log(info) 

            console.log(formData)

            axios.post("http://localhost:5000/register", formData, {} )
                .then(res => {
                    console.log(res);
                    alert("Please confirm us on your email")
                    window.location.href="/studentLogin"
                })
            


                let input = {};
            input["name"] = "";
            input["username"] = "";
            input["email"] = "";
            input["age"] = "";
            input["country"] = "";
            input["password"] = "";
            input["confirmPassword"] = "";
            input["image"] = "";
            this.setState({input:input});

        }else{
            console.log("invalid Inputs")
        }
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

        if(input["age"]<=0){
            isValid = false;
            errors["age"] = "Please enter your Age.";
        }

        if (!input["country"]) {
            isValid = false;
            errors["country"] = "Please enter your Country.";
          }
          

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
        
        if (!input["image"]) {
            isValid = false;
            errors["image"] = "Please upload your profile Picture.";
          }

        this.setState({
            errors: errors
          });
      
        return isValid;

    }

    render(){
        return (

            <div>
              
              <HomeNavbar>
                <Container fluid className="conreg">
                    
                    <Form className="registerForm"  encType="multipart/form-data"  method="post">
                    <h4 className="text-center ">Student Registration Form</h4>

                    
                        <Form.Group className="form_width">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" name = "name" className="inputStyle" value ={this.state.input.name} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.name}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name= "username" className="inputStyle" value ={this.state.input.username} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.username}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Age" name = "age" className="inputStyle"value ={this.state.input.age} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.age}</div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="form_width">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="someone@gmail.com" name ="email"  className="inputStyle" value ={this.state.input.email} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.email}</div>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1"  className="form_width">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" className="inputStyle" name = "country" value ={this.state.input.country} onChange={this.handleChange}>
                            <option>USA</option>
                            <option>Canada</option>
                            <option>English</option>
                            <option>German</option>
                            <option>France</option>
                            <option>Other</option>
                            </Form.Control>
                            <div className="text-danger">{this.state.errors.country}</div>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name = "password" className="inputStyle" value ={this.state.input.password} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.password}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name = "confirmPassword" className="inputStyle" value ={this.state.input.confirmPassword} onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.confirmPassword}</div>
                        </Form.Group>
                        <Form.Group  className="form_width">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file"   name = "image" onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.image}</div>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle" onClick={this.registerStudent}>Register</Button>
                        </Form.Group>
                    </Form>
                </Container>
                
               </HomeNavbar>
            </div>
        )
    }
}