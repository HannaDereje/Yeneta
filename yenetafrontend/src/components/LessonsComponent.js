import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'

export default class Lessons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: {},
            errors: {},
            content: "",
            questions: [],
            answers: [],
            activity2: {}


        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCkeditorState = this.handleCkeditorState.bind(this)
        this.handleCkeditorState2 = this.handleCkeditorState2.bind(this)
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.createUI = this.createUI.bind(this)
        this.addClick = this.addClick.bind(this)

    }
    handleCkeditorState2(i, e, editor) {
        let questions = [...this.state.questions]
        questions[i] = editor.getData()
        this.setState({ questions })

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
    handleChange2(i, e) {
        let answers = [...this.state.answers]
        answers[i] = e.target.value
        this.setState({ answers })
    }
    createUI() {

        return ([this.state.questions.map((el, i) =>
            <div key={i}>
                <Form.Group className="form_width ">
                    <Form.Label>Question</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        onInit={editor => {

                        }}

                        config={{
                            ckfinder: {
                                uploadUrl: "http://localhost:5000/addPicture"
                            }
                        }}
                        value={el || ''}
                        onChange={this.handleCkeditorState2.bind(this, i)}

                    />
                    <br />
                    <Form.Label>Answer</Form.Label>

                    <Form.Control type="text" onChange={this.handleChange2.bind(this, i)} placeholder="Add an answer" />

                </Form.Group></div>)]
        )





    }


    addClick() {
        this.setState(prevState => ({ questions: [...prevState.questions, ''] }))
        this.setState(prevState => ({ answers: [...prevState.answers, ''] }))
    }
    handleSubmit(event) {
        console.log(this.state.questions)
        console.log(this.state.answers)
        event.preventDefault()
    }
    onSubmit(e) {
        const q = this.state.questions
        const a = this.state.answers
        const act = { content: q, answer: a }
        this.setState({
            activity2: act
        })

        e.preventDefault();
        if (this.validate()) {

            const lesson = {
                level: this.state.input["level"],
                note: this.state.content,
                topic: this.state.input["topic"],
                activity: act,
                videoLink: this.state.input["videoLink"]

            }
            const header = {
                "x-access-token": localStorage.getItem("token")
            }
            console.log(lesson)
            axios.post("http://localhost:5000/insertLesson", lesson, { headers: header })
                .then(res => {
                    console.log(res)

                    window.location.reload()
                })

            let input = {};
            input["number"] = "";
            input["level"] = "";
            input["note"] = "";
            input["topic"] = "";
            input["videoLink"] = "";
            this.setState({ input: input });

        }

        else {
            console.log("invalid Inputs")
        }
    }
    validate() {

        let input = this.state.input;
        let errors = {}
        let isValid = true;


        if (!input["level"]) {
            isValid = false;
            errors["level"] = "Please enter the lesson level.";
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
    handleCkeditorState(e, editor) {
        const data = editor.getData();
        this.setState({
            content: data
        })
        console.log(data)
    }


    render() {
        return (

            <div className="lesson">
                <div className="lessonstyle" >
                    <h4 className="text-center">Lesson Form</h4>
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control type="text" id="topic" name="topic" value={this.state.input.topic} onChange={this.handleChange} placeholder="Topic" />
                            <div className="text-danger">{this.state.errors.topic}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Lesson Level Type</Form.Label>
                            <Form.Control as="select" name="level" value={this.state.input.level} onChange={this.handleChange}>
                            <option selected="true" disabled="disabled">Choose Level Type</option>  
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                            <div className="text-danger">{this.state.errors.level}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Notes</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                onInit={editor => {

                                }}

                                config={{
                                    ckfinder: {
                                        uploadUrl: "http://localhost:5000/addPicture"
                                    }
                                }}

                                onChange={this.handleCkeditorState}

                            />
                            <div className="text-danger">{this.state.errors.notes}</div>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Video Link</Form.Label>
                            <Form.Control type="text" name="videoLink" value={this.state.videoLink} onChange={this.handleChange} placeholder="Lesson Video Link" />
                            <div className="text-danger">{this.state.errors.videoLink}</div>
                        </Form.Group>

                    </Form>


                    <h4 className="text-center">Activity</h4>
                    {this.createUI()}
                    <Form.Group className="">
                        
                        <div className="bottom">
                        <Button onClick={this.addClick} className="btnstyle ">Add Questions</Button>
                        
                        <Button type="submit" onClick={this.onSubmit} className="btnstyle left">Add Lesson</Button>
                        </div>
                    </Form.Group>



                </div>

            </div>

        )

    }
}