import React, {Component, useEffect } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import '../css/register.css'
import axios from "axios"


export default class Exam extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{},
            divItems:[],
            count:0,
            number:1,
            content:'',
            answer : {},
            question:{}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCkeditorState = this.handleCkeditorState.bind(this)
        this.addQuiz = this.addQuiz.bind(this)
        this.validate = this.validate.bind(this)
        this.renderInput = this.renderInput.bind(this)
        this.handleAnswer = this.handleAnswer.bind(this)

    }

    handleChange(e){

        let input = this.state.input;
        input[e.target.name] = e.target.value;
        
        this.setState({
            input:input
        })

        console.log(this.state)
            
    }

    handleAnswer(e){
        
        let answer = this.state.answer

        this.setState({
            number : this.state.count
        })
        this.setState({
            content : e.target.value
        })

        
        answer[this.state.number] = this.state.content
        this.setState({
            answer:answer
        })
        console.log(this.state.answer)
    }

    handleCkeditorState(e, editor){

        const data = editor.getData();
        let question = this.state.question
        
        this.setState({
            number : this.state.count
        })
        this.setState({
            content : data
        })

        question[this.state.number] = this.state.content

        this.setState({
            question:question
        })

        console.log(data)
    }

    addQuiz(e){
    
        e.preventDefault();
        if(this.validate()){
            
            const info ={
                level :this.state.input["quiz_level"],
                question:this.state.question,
                answer:this.state.answer, 
                allowedTime :this.state.input["allowed_Time"],
                questionNumber :this.state.count+1
            }

            const header ={
                "x-access-token": localStorage.getItem("token")
            }


            console.log(info)
              axios.post("http://localhost:5000/insertQuiz", info, {headers:header})
                .then(response=>{
                    console.log(response)

                    window.location.reload()
                })  
            

        }else{
            console.log("invalid Inputs")
        }
    }

    
   

    renderInput(){

        const newdivs = [];
                newdivs.push(
                    
                        <div className="top">

                        <div className="form_width">
                        <CKEditor
                            editor={ClassicEditor}
                            onInit={editor=>{

                            }}
                            config= {{
                                ckfinder:{
                                    uploadUrl:"http://localhost:5000/insertImage"
                                }
                                
                            }}

                            name={this.state.number}
                            onChange={this.handleCkeditorState}

                        />
                        </div>
                        <Form.Group className="form_width">
                                <Form.Label>Question Number {this.state.count +1} Answer</Form.Label>
                                <Form.Control type="text" placeholder="Add your answer" name={this.state.number}  onChange={this.handleAnswer}  />
                        </Form.Group>
                        </div>
                                            
                        )
        
        this.setState({count:this.state.count+1})
        this.setState({divItems:this.state.divItems.concat(newdivs)})
                        
            

        
    }
    

 
   


    validate(){

        let input = this.state.input;
        let errors ={}
        let isValid = true;

        if(!input["quiz_level"]){
            isValid = false;
            errors["quiz_level"] = "Please enter Quiz Level.";
        }
        

        if(!input["quiz_question_type"]){
            isValid = false;
            errors["quiz_question_type"] = "Please enter Question Type.";
        }
        if(!input["allowed_Time"]){
            isValid = false;
            errors["allowed_Time"] = "Please enter Allowed Time.";
        }


        this.setState({
            errors: errors
          });
      
        return isValid;

    }

    



    render(){
        
        return (
            <div>
                <h4 className="text-center">Exam Form</h4>
                <div className = "lessonstyle">
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Exam Level Type</Form.Label>
                            <Form.Control as="select" name = "quiz_level" value={this.state.input.quiz_level} onChange={this.handleChange}>
                                <option selected="true" disabled="disabled">Choose Level</option>  
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="form_width">
                            <Form.Label>Exam Question Type</Form.Label>
                            <Form.Control as="select" name = "quiz_question_type"  value={this.state.input.quiz_question_type} onChange={this.handleChange}>
                                <option selected="true" disabled="disabled">Choose Question Type</option>  
                                <option value ="choose">Choose</option>
                                <option value = "shortanswer">Short Answer</option>
                                <option value = "match">Match</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Allowed Time</Form.Label>
                            <Form.Control type="number" id="topic" name="allowed_Time" value={this.state.input.allowed_Time} onChange={this.handleChange} placeholder="Allowed Time in minutes" />
                        </Form.Group>

                        
                        {this.state.divItems}
                        <Form.Group className="form_width">
                            
                            <Button className="btnstyle" onClick={this.renderInput}>Add Questions</Button>
                          </Form.Group> 

                           
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle" onClick={this.addQuiz}>Add Exam</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )

    }
}