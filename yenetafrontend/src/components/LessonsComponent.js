import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Activity from "./ActivitiesComponent"
import axios from 'axios'
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

        if (input[e.target.name] === "imageInput") {
            input[e.target.name] = e.target.files[0].name;
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
                lessonNumber: this.state.input["lessonNumber"],
                lessonLevelType: this.state.input["lessonLevelType"],
                notes: this.state.input["notes"],
                imageInput: this.state.input["imageInput"],
                audio: this.state.input["audio"],
                videoLink: this.state.input["videoLink"]

            }
            const formData = new FormData();
            formData.append('lessoNumber', lesson.lessonNumber);
            formData.append('lessonLevelType', lesson.lessonLevelType);
            formData.append('notes', lesson.notes);
            formData.append('imageInput', lesson.imageInput);
            formData.append('audio', lesson.audio);
            formData.append('videoLink', lesson.videoLink);

            console.log(lesson)

            axios.post("http://localhost:5000/registerTeacher", formData, {})
                .then(res => {
                    console.log(res)
                })
            let input = {};
            input["lessonNumber"] = "";
            input["lessonLevelType"] = "";
            input["notes"] = "";
            input["imageInput"] = "";
            input["audio"] = "";
            input["videoLink"] = "";
            this.setState({ input: input });
            window.location.href = "/teacherHome"
        }

        else {
            console.log("invalid Inputs")
        }
    }
    validate() {

        let input = this.state.input;
        let errors = {}
        let isValid = true;

        if (!input["lessonNumber"]) {
            isValid = false;
            errors["lessonNumber"] = "Please enter lesson Number.";
        }
        if (!input["lessonLevelType"]) {
            isValid = false;
            errors["lessonLevelType"] = "Please enter lesson level type.";
        }
        if (!input["notes"]) {
            isValid = false;
            errors["notes"] = "Please enter a note.";
        }
        if (!input["imageInput"]) {
            isValid = false;
            errors["imageInput"] = "Please enter image.";
        }

        if (!input["audio"]) {
            isValid = false;
            errors["audio"] = "Please enter an audio.";
        }
        if (!input["videoLink"]) {
            isValid = false;
            errors["videoLink"] = "Please enter the video link.";
        }




        this.setState({
            errors: errors
        });

        return isValid;

    }


    render() {
        return (
            <div>
                <h4 className="text-center">Lesson Form</h4>
                <div className="lessonstyle">
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Number</Form.Label>
                            <Form.Control type="text" name="lessonNumber" value={this.state.input.lessonNumber} onChange={this.handleChange} placeholder="Lesson Number" />
                            <div className="text-danger">{this.state.errors.lessonNumber}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Level Type</Form.Label>
                            <Form.Control as="select" name="lessonLeveltype" value={this.state.input.LessonLevelType} onChange={this.handleChange}>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                            <div className="text-danger">{this.state.errors.lessonLevelType}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Notes</Form.Label>
                            <p><textarea placeholder="Note" name="notes" value={this.state.input.notes} onChange={this.handleChange} className="areawidth" cols="74" rows="6"></textarea></p>
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
                            <p><textarea placeholder="Image Description" className="areawidth" cols="74" rows="4"></textarea></p>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Audio</Form.Label>
                            <Form.File name="audioInput" onChange={this.handleChange}
                                id="custom-file"
                                label="Custom file input"
                                custom
                            />
                            <div className="text-danger">{this.state.errors.audioInput}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Video Link</Form.Label>
                            <Form.Control type="text" name="videoLink" value={this.state.input.VideoLink} onChange={this.handleChange} placeholder="Lesson Video Link" />
                            <div className="text-danger">{this.state.errors.videoLink}</div>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" onClick={this.onSubmit} className="btnstyle">Add Lesson</Button>
                        </Form.Group>
                    </Form>
                    <Activity></Activity>
                </div>
            </div>
        )

    }
}