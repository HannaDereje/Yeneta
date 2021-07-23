import React, {Component } from 'react'
import {Button, InputGroup, Form, FormControl} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'

export default class StudentProfile extends Component{

    render(){
        return (

            <div>
                <StudentNavBar>
                    <div className="whole">
                        <div className = "info">User Information<hr/>
                            
                        <p>Full Name: <span>lorem Ipsum</span></p>
                        <p>Username: <span>Lorem ipsum lorem</span></p>  
                        <p>Email<span> somone@gmail.com</span></p>  
                        <p>Age: <span>12</span></p>  
                        <p>Country: <span>Canada</span></p>  
                        

                        <Form className="formStyle3">
                            <InputGroup className="mb-3 inputGroupStyle">
                                <FormControl
                                type="text" placeholder="type your Question"
                                />
                                <InputGroup.Append>
                                <Button variant="success">Ask</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                        </div>
                    </div> 
                </StudentNavBar>
            </div>
        )

    }
}