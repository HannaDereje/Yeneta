import React, { Component } from 'react'
import { Container, Button, Form } from "react-bootstrap"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'
import axios from 'axios'
export default class Login extends Component {
    constructor(props) {
        super()
        this.state = {

            input: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.validate = this.validate.bind(this)
        this.onLogin = this.onLogin.bind(this)

    }
    handleChange(e) {

        let input = this.state.input;

        /*if (input[e.target.name] === "img") {
            input[e.target.name] = e.target.files[0].name;
        }*/
        input[e.target.name] = e.target.value;

        this.setState({
            input: input
        })
    }

    onLogin(e) {
        e.preventDefault();
        if (this.validate()) {
            const user = {
                email: this.state.input["email"],
                password: this.state.input["password"],
            }
            const formData = new FormData();
            formData.append('email', user.age);
            formData.append('password', user.password);
            console.log(user)
            axios.post("http://localhost:5000/Login", user, {})
                .then(response => {
                    console.log(response)

                    if (response.data == "STUDENT") {
                        window.location.href = "/entranceQuiz"
                    }
                    if (response.data == "TEACHER") {
                        window.location.href = "/teacherHome"
                    }

                    if (response.data == "Wrong Password") {
                        alert("Login Failed")
                    }
                })
            let input = {};
            input["email"] = "";
            input["password"] = "";
            this.setState({ input: input });
        }
        else {
            console.log("invalid Inputs")
        }
    }
    validate() {

        let input = this.state.input;
        let errors = {}
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof input["email"] !== "undefined") {
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
                                <Form.Control type="email" name="email" value={this.state.input.email} onChange={this.handleChange} placeholder="Someone@gmail.com" />
                                <div className="text-danger">{this.state.errors.email}</div>

                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="form_width">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.input.password} onChange={this.handleChange} placeholder="Password" />
                            </Form.Group>
                            <div className="text-danger">{this.state.errors.password}</div>
                            <Form.Group controlId="formBasicCheckbox" className="form_width">
                                <Form.Check type="checkbox" label="Remember Password" />
                            </Form.Group>
                            <Form.Group className="form_width btnstyle">
                                <Button variant="success" type="submit" onClick={this.onLogin} className="btnStyle2">Login</Button>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <a href="#" className="astyle">Forget Password</a>
                            </Form.Group>

                        </Form>
                    </Container>

                </HomeNavbar>
            </div>
        )
    }
}