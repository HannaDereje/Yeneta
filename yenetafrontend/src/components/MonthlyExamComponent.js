import React, {Component } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Exam extends Component{

    render(){
        return (
            <div>
                <h4 className="text-center">Exam Form</h4>
                <div className = "lessonstyle">
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Exam Number</Form.Label>
                            <Form.Control type="text" placeholder="Lesson Number" />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Exam Level Type</Form.Label>
                            <Form.Control as="select">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Total Exam Question Number</Form.Label>
                            <Form.Control type="number" placeholder="Total Number" />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Exam Question Type</Form.Label>
                            <Form.Control as="select">
                                <option>Text</option>
                                <option>Image</option>
                                <option>Audio</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle">Add Exam</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )

    }
}