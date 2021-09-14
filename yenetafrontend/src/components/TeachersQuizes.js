import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Container, Jumbotron, Button, Form, Table, Card } from "react-bootstrap"
import '../css/register.css';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
export default class TeachersQuizes extends Component {
    constructor() {
        super()
        this.state = {
            quizes: [],
            singleQuiz:''

        }
        this.handleCkeditorStateForAnswer = this.handleCkeditorStateForAnswer.bind(this)
        this.handleCkeditorStateForQuestion = this.handleCkeditorStateForQuestion.bind(this)



    }

    handleCkeditorStateForQuestion(e, editor){

        const data = editor.getData();
        this.setState({question:data})
        
    }

    handleCkeditorStateForAnswer(e, editor){

        const data = editor.getData();
        this.setState({answer:data})
        
    }

    componentDidMount() {
        const header = {
            "x-access-token": localStorage.getItem("token")
        }
        const ids2 = []

        axios.get(`http://localhost:5000/teachersQuiz`, { headers: header })
        .then(res => {

            const Quizes = res.data
            Quizes.forEach(quiz=>{

                        axios.post(`http://localhost:5000/getMany`, { ids: quiz.questions })
                            .then(questions => {

                                const concated={}
                                var all = []

                                

                                concated["quiz"]= quiz
                                concated["questions"] = questions.data
                                all.push(concated)

                                this.setState({
                                    quizes: this.state.quizes.concat(all),
                                    
                                })

                            })

                })
        })
        
    }

    

    editQuestionAnswer = async(id) => {
        await axios.get(`http://localhost:5000/posts/edit/${id}`).then(res=>{
            console.log(res);
        });
    }
    render() {

        return (
            <div>
                <h4 className="text-center">Quiz List</h4>

<div className ="approvals">

{this.state.quizes.map((quiz) =>
<Card style={{ width: '18rem' }}>
<Card.Body>
    <Card.Title>Quiz {quiz.quiz.number} </Card.Title>
    <Card.Text>
    <p>{quiz.quiz.level} Level</p>
    </Card.Text>
    <Card.Body>
    {quiz.questions.map((question, index)=>
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
     
 />

 <div className="top">
<Button variant="primary" onClick={()=>this.deleteQuestion(question._id)} type="submit" >Save</Button>
<Button  classname ="spaced" onClick={()=>this.editQuestionAnswer(question._id)} variant="danger" type="submit" >Delete</Button>
</div>
 </div>
    )}
    
    </Card.Body>
</Card.Body>
</Card>
)}


</div>
                
            </div>

        )



    }
}