import React, {Component} from 'react'
import {Container,  Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'
import HomeNavBar from './HomeNavbarComponent'
import axios from "axios"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'

export default class EntranceQuiz extends Component{


    constructor(){
        super()
        this.state = {
            questions:[],  
            number:'',
            content:'',
            answer : {},
            result:0,
            correctOnes:{},
            student:{},
            level:"",
            quizTaken:false
        }

        
        this.handleAnswer = this.handleAnswer.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
    }

    handleAnswer(e){
        
        let answer = this.state.answer

        
        this.setState({number : e.target.name
            , content:e.target.value})
        
        answer[this.state.number] = this.state.content

        this.setState({
            answer:answer
        })

        console.log(this.state.answer)
    }


    submitAnswer(e){
    
        e.preventDefault();  
            const info ={
                answer:this.state.answer
            }
            const header ={
                "x-access-token": localStorage.getItem("token")
            }

            console.log(info)
               axios.post("http://localhost:5000/getEntranceQuizResult", info, {})
                .then(response=>{
                    this.setState({result:response.data.result})
                    this.setState({correctOnes:response.data.correct})
                    this.setState({quizTaken:true})

                })  

                axios.get("http://localhost:5000/getStudent", {headers:header})
                    .then(response=>{
                        this.setState({student:response.data.Student})
                    })

                
                if(this.state.result > 0 && this.state.result >= 2){
                    this.setState({level:"Beginner"})
                }
                else if(this.state.result >= 3 && this.state.result <= 5){
                    this.setState({level:"Intermediate"})
                }

                else if(this.state.result == 6 ){
                    this.setState({level:"Advanced"})
                }
                axios.put("http://localhost:5000/updateStudent", this.state.level, {headers:header})
                    .then(response=>{
                        console.log(response.data)
                    })

    }

    componentDidMount(){

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        
        axios.get("http://localhost:5000/getRandomQuestions")
        .then(response=>{
            console.log(response.data)
            this.setState({questions:response.data})
        })
        .catch((error)=>
            console.log(error)
        )

    }

    render(){
        return (

            <div>

                <HomeNavBar>
                <Container className="conlogin">

                    <h5>Do you want to take a quiz and group under your level by Your Result? <a href = "#">Select Quiz</a></h5>
                    <br/>
                    <Form className="textStyle ">
                       
                    {this.state.questions.map((list, index)=>
                        

                        <div className="questions">
                            <div className="top">
                        <CKEditor
                                key={list._id}
                                data={list.content}
                                disabled={true}
                                editor={ClassicEditor}
                                config={{
                                    isReadOnly: true,
                                    toolbar: ['']
                                }}
 
 
                            />
                            </div>
                            <Form>
                                <Form.Group className="form_width">
                                    <Form.Label>Answer</Form.Label>
                                    <Form.Control type="text" placeholder="add Answer"  name={index+ "_"+list._id} onChange={this.handleAnswer} />
                         </Form.Group>
                            </Form>
                        </div>
                    )}

                        <Form.Group className="btnStyle2">
                            <Button variant="success" onClick={this.submitAnswer}>Submit Answer</Button>
                        </Form.Group>
                    </Form>

                    <div>
                        {this.state.quizTaken === true?
                    <div><p>{this.state.result}/6</p><p><a href='/classroom?level = ' {...this.state.level}>Start Your Lesson</a></p></div>: ""  
                    }

                    </div>
                    </Container>
                    </HomeNavBar>
                   
            </div>
        )
    }
}