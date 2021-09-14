import React, { Component , useEffect} from 'react'
import { Container, Button, Form } from "react-bootstrap"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'
import axios from "axios"

export default class Login extends Component {

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{},
            role:"",
            token:"",
            approved:false
        }
        

        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        this.validate = this.validate.bind(this)
        this.rememberMe = this.rememberMe.bind(this)
    }


    

    handleChange(e){

        let input = this.state.input;
        if(e.target.name == "remember"){
            input[e.target.name] = e.target.checked;
        
        }
        input[e.target.name] = e.target.value;
        
        this.setState({
            input:input
        })
    }

    rememberMe(token, role){

        var remembered = false;
        var checked = this.state.input.remember;

        if(checked && this.state.input.email !== ""){
            localStorage.setItem("rememberMe", checked)
            localStorage.setItem('token', token);
            localStorage.setItem('role', role)
            remembered = true

            return true
        }

    }
    componentDidMount(){

    
            var loggedInUserToken = localStorage.getItem("token");
            var loggedInUserRole = localStorage.getItem("role")
            var rememberMe = localStorage.getItem("rememberMe")

            if(rememberMe && rememberMe !== ""){
                if(loggedInUserRole === "STUDENT"){
                    window.location.href = "/classroom"
                }
                if(loggedInUserRole === "TEACHER"){
                    window.location.href = "/teacherHome"
                }
            }
        
    }

    

    login(e){
    
        e.preventDefault();
        
        if(this.validate()){


            const info = {
                email:this.state.input["email"],
                password:this.state.input["password"]
            }

            console.log(info)

            axios.post("http://localhost:5000/login", info, {})
                .then(response=>{
                    console.log(response)

                    if(response.data.role =="STUDENT"){
                    
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('role', response.data.role)

                        const header ={
                            "x-access-token": localStorage.getItem("token")
                        }
                        
                        axios.get("http://localhost:5000/getStudent",  {headers:header})
                        .then(response=>{

                            if(response.data.Student.approved == true){
                            
                                window.location.href = `/classroom?level = ${response.data.Student.level}`
                                
                            }else{
                                window.location.href = "/entranceQuiz"
                            }
                        })
             
                    }
                    if(response.data.role =="TEACHER"){
                        window.location.href = "/teacherHome"
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('role', response.data.role)
                    }
                    if(response.data.role =="ADMIN"){
                        window.location.href = "/adminhome"
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('role', response.data.role)
                    }

                    if(response.data.message == "Wrong Password"){
                        alert("Login Failed")
                    }
                })



            let input = {};
            input["email"] = "";
            input["password"] = "";
            this.setState({input:input});

        }else{
            console.log("invalid Inputs")
        
        }
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

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        this.setState({
            errors: errors
          });
      
        return isValid;

    }
    render() {
        return (

            <div>
                <HomeNavbar>
                    <Container className="conlogin">


                        <Form className="loginForm">
                            <h4 className="text-center">Login Page</h4>
                            <Form.Group controlId="formBasicEmail" className="form_width">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name = "email" value={this.state.input.email} placeholder="Someone@gmail.com" onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.email}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="form_width">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name = "password" value = {this.state.input.password} onChange={this.handleChange}/>
                                <div className="text-danger">{this.state.errors.password}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox" className="form_width">
                                <Form.Check type="checkbox" label="Remember Password" name = "remember" onChange = {e=>{this.handleChange(e); this.rememberMe(this.state.token, this.state.role);}}  />
                            </Form.Group>
                            <Form.Group className="form_width btnstyle">
                                <Button variant="success" className="btnStyle2" onClick={this.login} >Login</Button>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <a href="/reset" className="astyle">Forget Password</a>
                            </Form.Group>

                        </Form>
                    </Container>

                </HomeNavbar>
            </div>
        )
    }
}