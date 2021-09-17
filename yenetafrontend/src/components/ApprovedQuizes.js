import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Card, Container, Button, Form, Table, ListGroup } from "react-bootstrap"
import { left } from '@popperjs/core';
import '../css/register.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default class UnapprovedQuizes extends Component {
    constructor() {
        super()
        this.state = {
            approvedQuizes: []
        }

        this.getQuizes = this.getQuizes.bind(this)
    }
    
    
    getQuizes() {

        const header = {
            "x-access-token": localStorage.getItem("token")
        }

        axios.get("http://localhost:5000/getAllQuizes", {headers:header})
            .then(res => {

                res.data.forEach(element => {

                    if(element.approved){

                    axios.post(`http://localhost:5000/getMany`, { ids : element.questions })
                        .then(res => {

                            var concated={}
                            var all = []
                            concated["quiz"]= element
                            concated["questions"] = res.data
                            all.push(concated)

                            this.setState({
                                approvedQuizes:this.state.approvedQuizes.concat(all)
                            })
                            console.log(this.state.approvedQuizes)
                        })
                    }
                })
            
             })
    }



    componentDidMount() {
        this.getQuizes()
    }

    render() {
        return (

            <div>
            <h4 className="text-center">Unapproved Quizes</h4>
                
                <div className="approvals">
             
             {this.state.approvedQuizes.map((quiz)=>
                 
                <Card style={{ width: '18rem' }}>
                    <Card.Title className="text-center">Quiz {quiz.quiz.number} with time Allowd time {quiz.quiz.allowedTime} Minutes</Card.Title>
                    <Card.Text>
                    <h6>{quiz.quiz.level} Level</h6>
                    </Card.Text>

                            {quiz.questions.map((qu2, i) => {
                                return (

                                    <Card.Body>
                                        <h6>Question</h6>
                                        <CKEditor
                                            key={qu2._id}
                                            data={qu2.content}
                                            disabled={true}
                                            editor={ClassicEditor}
                                            config={{
                                                isReadOnly: true,
                                                toolbar: ['']
                                            }}
                                        />
                                            <Card.Text> 
                                                <h6>Answer</h6>
                                                <p>{qu2.answer} Level</p>
                                            </Card.Text>
                                        </Card.Body>
                                        
                                    )

                            })}
                           
                            
                    </Card>
                    
                )}
                </div>


            </div>
        )
    }

}
