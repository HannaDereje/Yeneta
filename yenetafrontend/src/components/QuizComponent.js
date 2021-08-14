import React, { Component } from 'react'
import { Container, Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import HomeNavBar from './HomeNavbarComponent'

export default class EntranceQuiz extends Component {

    render() {
        return (

            <div>

                <HomeNavBar>
                    <Container className="conlogin">

                        <h5>Do you want to take a quiz and group under your level by Your Result? <a href="#">Select Quiz</a></h5>
                        <br />
                        <Form className="textStyle ">

                            <div className="questions">
                                <Form.Label className="questionStyle">1. Lorem ipsum lorem ipsum?</Form.Label>
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                            </div>

                            <div className="questions">
                                <Form.Label className="questionStyle">2. Lorem ipsum lorem ipsum?</Form.Label>
                                <p><audio controls><source src={""}></source></audio></p>
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                            </div>

                            <div className="questions">
                                <Form.Label className="questionStyle">3. Lorem ipsum lorem ipsum?</Form.Label>
                                <p><img src="../images/img2.jpg" width="100" height="100" /></p>
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                            </div>

                            <div className="questions">
                                <Form.Label className="questionStyle">4. Lorem ipsum lorem ipsum?</Form.Label>
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                            </div>

                            <div className="questions">
                                <Form.Label className="questionStyle">5. Lorem ipsum lorem ipsum?</Form.Label>
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                            </div>

                            <div className="questions">
                                <Form.Label className="questionStyle">6. Lorem ipsum lorem ipsum?</Form.Label>
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                                <Form.Check type="radio" label="Lorem ipsum" name="level" />
                            </div>

                            <Form.Group className="btnStyle2">
                                <Button variant="success" >Submit Answer</Button>
                            </Form.Group>
                        </Form>
                    </Container>
                </HomeNavBar>

            </div>
        )
    }
}