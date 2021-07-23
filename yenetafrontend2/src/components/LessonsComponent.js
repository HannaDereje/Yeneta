import React, {Component } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Activity from "./ActivitiesComponent"

export default class Lessons extends Component{

    render(){
        return (
            <div>
                <h4 className="text-center">Lesson Form</h4>
                <div className = "lessonstyle">
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Number</Form.Label>
                            <Form.Control type="text" placeholder="Lesson Number" />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Level Type</Form.Label>
                            <Form.Control as="select">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Notes</Form.Label>
                            <p><textarea placeholder = "Note" className="areawidth" cols="74" rows="6"></textarea></p>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Image Input</Form.Label>
                            <Form.File
                                id="custom-file"
                                label="Custom file input"
                                custom
                            /><br/><br/>
                            <p><textarea placeholder = "Image Description" className="areawidth" cols="74" rows="4"></textarea></p>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Audio</Form.Label>
                            <Form.File
                                id="custom-file"
                                label="Custom file input"
                                custom
                            />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Video Link</Form.Label>
                            <Form.Control type="text" placeholder="Lesson Video Link" />
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle">Add Lesson</Button>
                        </Form.Group>
                    </Form>
                    <Activity></Activity>
                </div>
            </div>
        )

    }
}