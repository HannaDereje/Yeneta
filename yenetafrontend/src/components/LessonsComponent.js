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

    render() {
        return (
            <div>
                <h4 className="text-center">Lesson Form</h4>
                <div className="lessonstyle">
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Number</Form.Label>
                            <Form.Control type="text" name="lessonNumber" value={this.state.input.lessonNumber} onChange={this.handleChange} placeholder="Lesson Number" />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Level Type</Form.Label>
                            <Form.Control as="select" name="lessonLeveltype" value={this.state.input.LessonLevelType} onChange={this.handleChange}>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Notes</Form.Label>
                            <p><textarea placeholder="Note" name="notes" value={this.state.input.notes} onChange={this.handleChange} className="areawidth" cols="74" rows="6"></textarea></p>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Image Input</Form.Label>
                            <Form.File value={this.state.input.imageInput} onChange={this.handleChange}
                                id="custom-file"
                                label="Custom file input"
                                custom
                            /><br /><br />
                            <p><textarea placeholder="Image Description" className="areawidth" cols="74" rows="4"></textarea></p>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Audio</Form.Label>
                            <Form.File name="imageInput"
                                id="custom-file"
                                label="Custom file input"
                                custom
                            />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Video Link</Form.Label>
                            <Form.Control type="text" value={this.state.VideoLink} onChange={this.onChangeVideoLink} placeholder="Lesson Video Link" />
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