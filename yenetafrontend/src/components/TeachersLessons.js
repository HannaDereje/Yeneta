import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Container, Jumbotron, Button, Form, Table, Card } from "react-bootstrap"
import '../css/register.css';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
export default class TeachersLessons extends Component {
    constructor() {
        super()
        this.state = {
            singleLesson:'',
            lesson: [],
            note:'',
            question:'',
            answer:''

        }
        this.handleCkeditorStateForAnswer = this.handleCkeditorStateForAnswer.bind(this)
        this.handleCkeditorStateForNote = this.handleCkeditorStateForNote.bind(this)
        this.handleCkeditorStateForQuestion = this.handleCkeditorStateForQuestion.bind(this)


    }

    componentDidMount() {
        const header = {
            "x-access-token": localStorage.getItem("token")
        }
        const ids2 = []

        axios.get(`http://localhost:5000/teachersLessons`, { headers: header })
        .then(res => {

            const lessons = res.data
            lessons.forEach(lesson=>{

                    axios.get(`http://localhost:5000/getActivity/${lesson.activity}`)
                       .then(response => {
                           const activity = response.data

                        axios.post(`http://localhost:5000/getMany`, { ids: activity.questions })
                            .then(questions => {

                                const concated={}
                                var all = []

                                
                                console.log(this.state.lesson)

                                concated["lesson"]= lesson
                                concated["questions"] = questions.data
                                all.push(concated)

                                this.setState({
                                    lesson: this.state.lesson.concat(all),
                                    
                                })

                            })
                        
               
    })  

})
        })
        
                   
    }

   
    editLesson = async(id) => {

        const header = {
            "x-access-token": localStorage.getItem("token")
        }
        const info ={
            note:this.state.note
        }
        console.log(info)

        await axios.put(`http://localhost:5000/updateLesson/${id}`, info, {headers:header}).then(res=>{
            console.log(res);
        });
    }
    handleCkeditorStateForNote(e, editor){

        const data = editor.getData();
        this.setState({note:data})
        
    }

    handleCkeditorStateForQuestion(e, editor){

        const data = editor.getData();
        this.setState({question:data})
        
    }

    handleCkeditorStateForAnswer(e, editor){

        const data = editor.getData();
        this.setState({answer:data})
        console.log(data)
        
    }
    editQuestionAnswer = async(id) => {

        const info ={
            question:this.state.question,
            answer:this.state.answer
        }
        console.log(info)
        await axios.put(`http://localhost:5000/updateQuestion/${id}`, info).then(res=>{
            console.log(res);
        });
    }

    componentDidMount(){

        
    }

    render() {

        return (
            <div>
                    

                   <h4 className="text-center">lessons</h4>

                <div className ="approvals">

                {this.state.lesson.map((lesson) =>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Lesson {lesson.lesson.number} with Topic {lesson.lesson.topic}</Card.Title>
                    <Card.Text>
                    <p>{lesson.lesson.level} Level</p>
                    <p>See the video linked {lesson.lesson.videoLink}</p>
                    </Card.Text>
                    <Card.Body>
                        <p>Lesson Note</p>
                    <CKEditor
                                key={lesson.lesson._id}
                                data={lesson.lesson.note}
                                editor={ClassicEditor}
                                config={{
                                    isReadOnly: true,
                                    toolbar: ['']
                                }}
 
                                onChange={this.handleCkeditorStateForNote}
 
                            />
                    {lesson.questions.map((question, index)=>
                    <div>
                    <p>Question Number {index+1}</p>
                        <CKEditor
                     key={question._id}
                     data={question.content}
                     editor={ClassicEditor}
                     config={{
                         isReadOnly: true,
                         toolbar: ['']
                     }}
                     
                     onChange={this.handleCkeditorStateForQuestion}
                     
                 />
                 <p>Question Number {index+1} Answer</p>
                  <CKEditor
                     key={question._id}
                     data={question.answer}
                     editor={ClassicEditor}
                     config={{
                         isReadOnly: true,
                         toolbar: ['']
                     }}
                     
                     onChange={this.handleCkeditorStateForAnswer}
                 />

                 <div className="top">
                <Button variant="primary" onClick={()=>this.editQuestionAnswer(question._id)} type="submit" >Save</Button>
                </div>
                 </div>
                    )}
                    
                    </Card.Body>
                    <Button variant="primary" type="submit" onClick={()=>this.editLesson(lesson.lesson._id)} >Edit</Button>
                </Card.Body>
                </Card>
                )}
               

                </div>

            </div>

        )



    }
}