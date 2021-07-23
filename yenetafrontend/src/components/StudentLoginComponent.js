import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'
export default class Login extends Component{


    render(){
        return (

            <div>
                <HomeNavbar>
                <Container className="conlogin">
                   
                
                    <Form className="loginForm">
                    <h4 className="text-center">Student Login Page</h4>
                        <Form.Group controlId="formBasicEmail" className="form_width">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Someone@gmail.com"  />
                            

                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox" className="form_width">
                            <Form.Check type="checkbox" label="Remember Password" />
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button variant="success" className="btnStyle2">Login</Button>
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