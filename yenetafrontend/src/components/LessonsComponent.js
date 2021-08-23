import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Activity from "./ActivitiesComponent"
import axios from 'axios'
import HomeNavbar from './HomeNavbarComponent'
import { Row, Col } from "react-bootstrap"
import '../css/register.css';
import { isNumber } from 'util';
export default class Lessons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: {},
            errors: {}

        }
        this.handleChange = this.handleChange.bind(this)
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    handleChange(e) {

        let input = this.state.input;

        if (e.target.name === "imageInput") {
            input[e.target.name] = e.target.files[0];
            console.log()
        }
        if (e.target.name === "audio") {
            input[e.target.name] = e.target.files[0];
        }
        input[e.target.name] = e.target.value;

        this.setState({
            input: input
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            const lesson = {
                number: this.state.input["number"],
                level: this.state.input["level"],
                note: this.state.input["note"],
                imageInput: this.state.input["imageInput"],
                imageDescription: this.state.input["imageDescription"],
                audio: this.state.input["audio"],
                topic: this.state.input["topic"],
                videoLink: this.state.input["videoLink"]

            }

            axios.post("http://localhost:5000/addLesson", lesson)
                .then(res => {
                    console.log(res)
                })
            let input = {};
            input["number"] = "";
            input["level"] = "";
            input["note"] = "";
            input["imageInput"] = "";
            input["imageDescription"] = "";
            input["audio"] = "";
            input["topic"] = "";
            input["videoLink"] = "";
            this.setState({ input: input });
            // window.location.href = "/teacherHome"

        }

        else {
            console.log("invalid Inputs")
        }
    }
    validate() {

        let input = this.state.input;
        let errors = {}
        let isValid = true;

        if (!input["number"]) {
            isValid = false;
            errors["number"] = "Please enter lesson number.";
        }
        if (!input["level"]) {
            isValid = false;
            errors["level"] = "Please enter the lesson level.";
        }
        if (!input["note"]) {
            isValid = false;
            errors["note"] = "Please enter note.";
        }
        if (!input["imageInput"]) {
            isValid = false;
            errors["image"] = "Please enter image.";
        }

        if (!input["imageDescription"]) {
            isValid = false;
            errors["imageDescription"] = "Please enter image description.";
        }
        if (!input["audio"]) {
            isValid = false;
            errors["audio"] = "Please enter audio.";
        }
        if (!input["videoLink"]) {
            isValid = false;
            errors["videoLink"] = "Please enter video link.";
        }

        if (!input["topic"]) {
            isValid = false;
            errors["topic"] = "Please enter topic.";
        }

        this.setState({
            errors: errors
        });

        return isValid;

    }

    render() {
        return (
            <div className="lesson">
                <HomeNavbar>
                    <h4 className="text-center">Lesson Form</h4>
                    <div className="lessonstyle">
                        <Form>
                            <Form.Group className="form_width">
                                <Form.Label>Lesson Number</Form.Label>
                                <Form.Control type="number" id="number" name="number" value={this.state.input.number} onChange={this.handleChange} placeholder="Lesson Number" />
                                <div className="text-danger">{this.state.errors.number}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text" id="topic" name="topic" value={this.state.input.topic} onChange={this.handleChange} placeholder="Topic" />
                                <div className="text-danger">{this.state.errors.topic}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Lesson Level Type</Form.Label>
                                <Form.Control as="select" name="level" value={this.state.input.level} onChange={this.handleChange}>
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </Form.Control>
                                <div className="text-danger">{this.state.errors.level}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Notes</Form.Label>
                                <p><textarea placeholder="Note" name="note" value={this.state.input.note} onChange={this.handleChange} className="areawidth" cols="74" rows="6"></textarea></p>
                                <div className="text-danger">{this.state.errors.notes}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Image Input</Form.Label>
                                <Form.File name="imageInput" value={this.state.input.imageInput} onChange={this.handleChange}
                                    id="custom-file"
                                    label="Custom file input"
                                    custom
                                /><br /><br />
                                <div className="text-danger">{this.state.errors.imageInput}</div>
                                <p><textarea placeholder="Image Description" name="imageDescription" value={this.state.input.imageDescription} onChange={this.handleChange} className="areawidth" cols="74" rows="4"></textarea></p>
                                <div className="text-danger">{this.state.errors.imageDescription}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Audio</Form.Label>
                                <Form.File name="audio" value={this.state.input.audio} onChange={this.handleChange}
                                    id="custom-file"
                                    label="Custom file input"
                                    custom
                                />
                                <div className="text-danger">{this.state.errors.audio}</div>
                            </Form.Group>
                            <Form.Group className="form_width">
                                <Form.Label>Video Link</Form.Label>
                                <Form.Control type="text" name="videoLink" value={this.state.ideoLink} onChange={this.handleChange} placeholder="Lesson Video Link" />
                                <div className="text-danger">{this.state.errors.videoLink}</div>
                            </Form.Group>
                            <Form.Group className="form_width btnstyle">
                                <Button type="submit" onClick={this.onSubmit} className="btnstyle">Add Lesson</Button>
                            </Form.Group>
                        </Form>

                        <Activity></Activity>


                    </div>
                </HomeNavbar>
            </div>

        )

    }
}