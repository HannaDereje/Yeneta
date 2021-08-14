import React, { Component } from 'react'
import { Container, Button, Form } from "react-bootstrap"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'
import axios from 'axios'

export default class TeacherRegister extends Component {
    constructor(props) {
        super()
        this.state = {

            input: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.validate = this.validate.bind(this)
        this.registerUser = this.registerUser.bind(this)

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

    registerUser(e) {

        e.preventDefault();
        if (this.validate()) {
            const user = {
                name: this.state.input["name"],
                username: this.state.input["username"],
                email: this.state.input["email"],
                password: this.state.input["password"],
                confirmpassword: this.state.input["confirmpassword"],
                job: this.state.input["job"],
                experience: this.state.input["experience"]
            }
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('username', user.username);
            formData.append('email', user.age);
            formData.append('password', user.password);
            formData.append('confirmpassword', user.confirmpassword);
            formData.append('job', user.job);
            formData.append('experience', user.experience);
            console.log(user)

            axios.post("http://localhost:5000/registerTeacher", formData, {})
                .then(res => {
                    console.log(res)
                })
            let input = {};
            input["name"] = "";
            input["username"] = "";
            input["email"] = "";
            input["password"] = "";
            input["confirmpassword"] = "";
            input["job"] = "";
            input["experience"] = "";
            this.setState({ input: input });
            window.location.href = "/teacherHome"
        }
        else {
            console.log("invalid Inputs")
        }
        // const formData = new FormData();
        // formData.append('file', message);
    }
    validate() {

        let input = this.state.input;
        let errors = {}
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your name.";
        }
        if (!input["job"]) {
            isValid = false;
            errors["job"] = "Please enter your job.";
        }
        if (!input["experience"]) {
            isValid = false;
            errors["experience"] = "Please enter your experience.";
        }
        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your username.";
        }

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

        if ((input["username"]) && (input["username"].length < 7)) {
            isValid = false;
            errors["username"] = "username cannot be less than 7 characters"
        }
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
        if (!input["confirmpassword"]) {
            isValid = false;
            errors["confirmPassword"] = "Please enter your password.";
        }
        if (input["password"] && input["password"].length < 6) {
            isValid = false;
            errors["password"] = "Password should not be less than 6 characters.";
        }
        if (typeof input["password"] !== "undefined" && typeof input["confirmpassword"] !== "undefined") {

            if (input["password"] != input["confirmpassword"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
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
                    <Container fluid className="conreg">

                        <Form className="registerForm">
                            <h4 className="text-center ">Teacher Registration Form</h4>
                            <Form.Group className="form_width">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.input.name} onChange={this.handleChange} placeholder="Full Name" className="inputStyle" />
                                <div className="text-danger">{this.state.errors.name}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.input.username} onChange={this.handleChange} placeholder="Username" className="inputStyle" />
                                <div className="text-danger">{this.state.errors.username}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="form_width">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={this.state.input.email} onChange={this.handleChange} placeholder="someone@gmail.com" className="inputStyle" />
                                <div className="text-danger">{this.state.errors.email}</div>
                            </Form.Group>

                            <Form.Group controlId="formBasic" className="form_width">
                                <Form.Label>Job</Form.Label>
                                <Form.Control type="text" name="job" value={this.state.input.job} onChange={this.handleChange} className="inputStyle" />
                                <div className="text-danger">{this.state.errors.job}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasic" className="form_width">
                                <Form.Label>Experience</Form.Label>
                                <Form.Control type="text" name="experience" value={this.state.input.experience} onChange={this.handleChange} className="inputStyle" />
                                <div className="text-danger">{this.state.errors.experience}</div>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="form_width">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.input.password} onChange={this.handleChange} placeholder="Password" className="inputStyle" />
                                <div className="text-danger">{this.state.errors.password}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="confirmpassword" value={this.state.input.confirmpassword} onChange={this.handleChange} placeholder="Confirm Password" className="inputStyle" />
                                <div className="text-danger">{this.state.errors.confirmPassword}</div>
                            </Form.Group>
                            <Form.Group className="form_width btnstyle">
                                <Button type="submit" onClick={this.registerUser} className="btnstyle">Register</Button>
                            </Form.Group>
                        </Form>
                    </Container>

                </HomeNavbar>
            </div>
        )
    }
}