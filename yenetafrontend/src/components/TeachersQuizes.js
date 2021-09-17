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
            singleQuiz:'',
            question:'',
            answer:''

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
                                    quizes: this.state.quizes.concat(all)
                                    
                                })

                            })

                })
        })
        
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
</Card.Body>
</Card>
)}


</div>
                
            </div>

        )



    }
}