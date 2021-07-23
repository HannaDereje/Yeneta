import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import HomeNavbar from './HomeNavbarComponent'


export default class StudentRegister extends Component{


    render(){
        return (

            <div>
              
              <HomeNavbar>
                <Container fluid className="conreg">
                    
                    <Form className="registerForm">
                    <h4 className="text-center ">Student Registration Form</h4>

                    
                        <Form.Group className="form_width">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" className="inputStyle"/>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" className="inputStyle" />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Age" className="inputStyle"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="form_width">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="someone@gmail.com"  className="inputStyle"/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1"  className="form_width">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" className="inputStyle">
                            <option>USA</option>
                            <option>Canada</option>
                            <option>English</option>
                            <option>German</option>
                            <option>France</option>
                            <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Prefered Date</Form.Label>
                            <Form.Control type="date" className="inputStyle"/>
                        </Form.Group>
                        
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" className="inputStyle"/>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" className="inputStyle"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="form_width">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" className=""/>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle">Register</Button>
                        </Form.Group>
                    </Form>
                </Container>
                
               </HomeNavbar>
            </div>
        )
    }
}