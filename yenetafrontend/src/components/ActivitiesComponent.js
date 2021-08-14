import React, { Component, useEffect, } from 'react'
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
export default class Activity extends Component {

    render() {
        return (
            <div>
                <h4 className="text-center">Activity Form</h4>
                <div className="lessonstyle">
                    <Form>
                        <Form.Group className="form_width2">
                            <Form.Label>Activity Number</Form.Label>
                            <Form.Control type="text" placeholder="Lesson Number" />
                        </Form.Group>
                        <Form.Group className="form_width2">
                            <Form.Label>Activity Level Type</Form.Label>
                            <Form.Control as="select">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width2">
                            <Form.Label>Total Activity Question Number</Form.Label>
                            <Form.Control type="number" placeholder="Total Number" />
                        </Form.Group>
                        <Form.Group className="form_width2">
                            <Form.Label>Activity Question Type</Form.Label>
                            <Form.Control as="select">
                                <option>Text</option>
                                <option>Image</option>
                                <option>Audio</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width2 btnstyle">
                            <Button type="submit" className="btnstyle">Add Activity</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )

    }
}