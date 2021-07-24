import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
export default class AdminLogin extends Component{


    render(){
        return (

            <div>
                <Container className="conlogin">
                   
                
                    <Form className="loginForm">
                    <h4 className="text-center">Admin Login Page</h4>
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
                
            </div>
        )
    }
}