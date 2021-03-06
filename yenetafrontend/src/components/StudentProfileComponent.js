import React, { Component } from 'react'
import { Button, InputGroup, Form, FormControl } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'

import axios from "axios"


export default class StudentProfile extends Component {

    constructor() {
        super()
        this.state = {

            input: {},
            errors: {},
            student: [],
            user: [],
            questionsAndAnswers: [],
            questionsAndAnswers2: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.ask = this.ask.bind(this)
        this.listofQuestionsandAnswers = this.listofQuestionsandAnswers.bind(this)
    }

    handleChange(e) {

        let input = this.state.input;
        input[e.target.name] = e.target.value;

        this.setState({
            input: input
        })
    }

    listofQuestionsandAnswers() {

        const header = {
            "x-access-token": localStorage.getItem("token")
        }

        const concated = {}

        axios.get("http://localhost:5000/getAllQuestionsAnswers", { headers: header })
            .then(response => {
                if (response.data.questions.length == response.data.answers.length) {

                    response.data.questions.forEach(element => {
                        concated["id"] = element._id
                        concated["question"] = element.userquestion

                        this.setState({ questionsAndAnswers: this.state.questionsAndAnswers.concat(concated) })
                    });
                } else if (response.data.questions.length != response.data.answers.length) {

                    response.data.questions.forEach(element => {
                        concated["id"] = element._id
                        concated["question"] = element.userquestion
                        concated["answer"] = "Not answered yet"
                        this.setState({ questionsAndAnswers: this.state.questionsAndAnswers.concat(concated) })
                    });

                    console.log(this.state.questionsAndAnswers2)
                }

            })
    }

    ask(e) {

        e.preventDefault();
        if (this.validate()) {
            const info = {
                userquestion: this.state.input.question
            }

            const header = {
                "x-access-token": localStorage.getItem("token")
            }
            console.log(info)
            const concated = {}

            axios.post("http://localhost:5000/addQuestion", info, { headers: header })
                .then(response => {
                    concated["id"] = response.data.user
                    concated["question"] = response.data.userquestion
                    concated["answer"] = "Not answered yet"
                    this.setState({ questionsAndAnswers: this.state.questionsAndAnswers.concat(concated) })

                    console.log(response)
                })
            let input = {};
            input["question"] = "";
            this.setState({ input: input });

        }

    }

    componentDidMount() {

        const header = {
            "x-access-token": localStorage.getItem("token")
        }

        axios.get("http://localhost:5000/getStudent", { headers: header })
            .then(response => {
                this.setState({ user: response.data.user })
                this.setState({ student: response.data.Student })
                console.log(this.state.student)

            })
            .catch((error) =>
                console.log(error)
            )

        this.listofQuestionsandAnswers()
    }

    validate() {

        let input = this.state.input;
        let errors = {}
        let isValid = true;

        if (!input["question"]) {
            isValid = false;
            errors["question"] = "Please enter your Question please.";
        }

        this.setState({
            errors: errors
        });

        return isValid;

    }

    render() {



        return (

            <div>
                <StudentNavBar>
                    <div className="whole">
                        <div className="info">User Information<hr />
                            <div>
                                <p>Username: <span>{this.state.user.username}</span></p>
                                <p>Name: <span>{this.state.student.name}</span></p>
                                <p>Email: <span>{this.state.student.email}</span></p>
                                <p>Age: <span>{this.state.student.age}</span></p>
                                <p>Country: <span>{this.state.student.country}</span></p>
                                <p>Level: <span>{this.state.student.level}</span></p>
                            </div>

                            <Form className="formStyle3">
                                <InputGroup className="mb-3 inputGroupStyle">
                                    <FormControl
                                        type="text" placeholder="type your Question" name="question" value={this.state.input.question} onChange={this.handleChange}
                                    />
                                    <div className="text-danger">{this.state.errors.question}</div>
                                    <InputGroup.Append>
                                        <Button variant="success" onClick={this.ask}>Ask</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </div>

                        <div>
                            <div>
                                <h4>Questions and Answers</h4>
                                {this.state.questionsAndAnswers.map((list) =>
                                    <div key={list._id}>
                                        <p>{list.question}</p>
                                        <p class="answerStyle">{list.answer}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </StudentNavBar>
            </div>
        )

    }
}