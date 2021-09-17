import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import '../css/register.css'
import { Container, Button, Form, Table, Card } from "react-bootstrap"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default class Studentlist extends Component {
    constructor() {
        super()
        this.state = {
            approvedLessons: []
        }

    }
    componentDidMount() {
        const lesson2 = []
        axios.get("http://localhost:5000/getAllLessons")
            .then(res => {
                const lessons = res.data
                for (var i = 0; i < lessons.length; i++) {
                    const lesson = lessons[i]

                    if (lesson.approved) {
                        lesson2.push(lesson)

                    }
                    this.setState({ approvedLessons: lesson2 })


                }
                this.setState({ approvedLessons: lesson2 })


            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <h4 className="text-center">Approved lessons</h4>

                <div className ="approvals">

                {this.state.approvedLessons.map(approved =>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Lesson {approved.number} with Topic {approved.topic}</Card.Title>
                    <Card.Text>
                    <p>{approved.level} Level</p>
                    <p>See the video linked {approved.videoLink}</p>
                    </Card.Text>
                    <Card.Body>
                    <CKEditor
                                key={approved._id}
                                data={approved.note}
                                disabled={true}
                                editor={ClassicEditor}
                                config={{
                                    isReadOnly: true,
                                    toolbar: ['']
                                }}
 
 
                            />

                    </Card.Body>
                 </Card.Body>
                </Card>
                )}
               

                </div>
            </div>
        )

    }
}