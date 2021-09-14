import React, {Component, useEffect } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import '../css/register.css'

export default class Exam extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{},
            divItems:[],
            count:0

        }

        this.handleChange = this.handleChange.bind(this)
        this.addQuiz = this.addQuiz.bind(this)
        this.validate = this.validate.bind(this)
        this.renderInput = this.renderInput.bind(this)

    }

    handleChange(e){

        let input = this.state.input;
        input[e.target.name] = e.target.value;
        
        console.log()
        
        this.setState({
            input
        })

        console.log(this.state.input)
        this.setState({count:this.state.input.question_number})
        
            
    }


    addQuiz(e){
    
        e.preventDefault();
        if(this.validate()){

            console.log(this.state.count)
            const info=[]
            for (let i = 0; i < this.state.input.question_number; i++) {
                const value ={
                    question: this.state.question_number
                }
                info.push(value)
            }

            console.log(this.state)


            console.log(info)
            
            

        }else{
            console.log("invalid Inputs")
        }
    }

    handleChangeForQuestion(type){

        const newdivs = [];

        if(type && type !== ""){
            if(type == "file"){
            newdivs.push(
                <Form.Group className="form_width">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="file"  name={"imageques" +this.state.count}   onChange={this.handleChange}  />
                </Form.Group>
            )}
            if(type == "text"){
                newdivs.push(
                    <Form.Group className="form_width">
                                <Form.Label>Answer</Form.Label>
                                <Form.Control type="text"  name={"textques" + this.state.count} value ={this.state}  onChange={this.handleChange}  />
                    </Form.Group>
                )}
            this.setState({divItems:this.state.divItems.concat(newdivs)})
            console.log(this.state.divItems)
        }
    }

    handleChangeForchoice(type){
        const newdivs = [];

        if(type && type !== ""){
            if(type == "file"){
            newdivs.push(
                <Form.Group className="form_width">
                            <Form.Label>Exam Number</Form.Label>
                            <Form.Control type="file"  name={"choice" + this.state.count}   onChange={this.handleChange}  />
                </Form.Group>
            )}
            if(type == "text"){
                newdivs.push(
                    <Form.Group className="form_width">
                                <Form.Label>Exam Number</Form.Label>
                                <Form.Control type="text"  name={"choice" + this.state.count} value ={this.state.question_number}  onChange={this.handleChange}  />
                    </Form.Group>
                )}
            this.setState({divItems:this.state.divItems.concat(newdivs)})
            console.log(this.state.divItems)
        }
    }

    
   

    renderInput(number, type){

        const newdivs = [];
        if(number && type){
            
            if(type == "shortanswer"){

                newdivs.push(
                    <div className="fullheight">
                        <div className="display_flex">
                        <Form.Group className="form_width">
                            <Form.Label>Question Type</Form.Label>
                            <Form.Control as="select" name = "quiz_shortAnswer_question_type"  value={this.state.input.quiz_shortAnswer_question_type} onChange={e => { this.handleChange(e); this.handleChangeForQuestion(this.state.input.quiz_shortAnswer_question_type) }}>
                                <option></option>
                                <option value ="file">Image</option>
                                <option value = "file">Audio</option>
                                <option value = "text">Text</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="form_width">
                                <Form.Label>Answer</Form.Label>
                                <Form.Control type="text" name={"ans" + this.state.count} value ={this.state.answer_number} onChange={this.handleChange}  />
                        </Form.Group>
                        </div>

                        <div>{this.state.questions_answers}</div>

                        </div>
                                            
                        )

                        
                        
            
        }else if(type == "match"){

            newdivs.push(
            <div className="fullheight">
                        <div className="display_flex">
                        <Form.Group className="form_width">
                            <Form.Label>Question Type</Form.Label>
                            <Form.Control as="select" name = "quiz_choose_question_type"  value={this.state.input.quiz_choose_question_type} onChange={e => { this.handleChange(e); this.handleChangeForQuestion(this.state.input.quiz_choose_question_type)}}>
                                <option value ="file">Image</option>
                                <option value = "file">Audio</option>
                                <option value = "text">Text</option>
                            </Form.Control>
                        </Form.Group>

                        
                        <Form.Group className="form_width">
                            <Form.Label>Answer Type</Form.Label>
                            <Form.Control as="select" name = "quiz_choose_answer_type"  value={this.state.input.quiz_choose_answer_type} onChange={e => { this.handleChange(e); this.handleChangeForAnswer(this.state.input.quiz_choose_answer_type) }}>
                                <option value ="file">Image</option>
                                <option value = "file">Audio</option>
                                <option value = "text">Text</option>
                            </Form.Control>
                        </Form.Group>
                        </div>

                        <div>
                        <Form.Group className="form_width">
                            <Form.Label>Choice Type</Form.Label>
                            <Form.Control as="select" name = "quiz_choosea_question_type"  value={this.state.input.quiz_choosea_question_type} onChange={e => { this.handleChange(e); this.handleChangeForchoice(this.state.input.quiz_choosea_question_type)}}>
                                <option value ="file">Image</option>
                                <option value = "file">Audio</option>
                                <option value = "text">Text</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Choice Type</Form.Label>
                            <Form.Control as="select" name = "quiz_chooseb_question_type"  value={this.state.input.quiz_chooseb_question_type} onChange={e => { this.handleChange(e);this.handleChangeForchoice(this.state.input.quiz_chooseb_question_type)}}>
                                <option value ="file">Image</option>
                                <option value = "file">Audio</option>
                                <option value = "text">Text</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Choice Type</Form.Label>
                            <Form.Control as="select" name = "quiz_choosec_question_type"  value={this.state.input.quiz_choosec_question_type} onChange={e => { this.handleChange(e);this.handleChangeForchoice(this.state.input.quiz_choosec_question_type)}}>
                                <option value ="file">Image</option>
                                <option value = "file">Audio</option>
                                <option value = "text">Text</option>
                            </Form.Control>
                        </Form.Group>
                        </div>
                        


                        <div>{this.state.questions_answers}</div>

                        </div>
            )
        }
        this.setState({divItems:this.state.divItems.concat(newdivs)})
                        
            

        
    }
    }

 
   


    validate(){

        let input = this.state.input;
        let errors ={}
        let isValid = true;

        if(!input["quiz_number"]){
            isValid = false;
            errors["quiz_number"] = "Please enter Quiz Number.";
        }
        if(!input["quiz_level"]){
            isValid = false;
            errors["quiz_level"] = "Please enter Quiz Level.";
        }
        if(!input["question_number"]){
            isValid = false;
            errors["question_number"] = "Please enter Question Number.";
        }

        if(!input["quiz_question_type"]){
            isValid = false;
            errors["quiz_question_type"] = "Please enter Question Type.";
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
                            <Form.Label>Exam Number</Form.Label>
                            <Form.Control type="text" placeholder="Lesson Number" value={this.state.input.quiz_number} onChange={this.handleChange} name = "quiz_number"  />
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Exam Level Type</Form.Label>
                            <Form.Control as="select" name = "quiz_level" value={this.state.input.quiz_level} onChange={this.handleChange}>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="form_width">
                            <Form.Label>Exam Question Type</Form.Label>
                            <Form.Control as="select" name = "quiz_question_type"  value={this.state.input.quiz_question_type} onChange={this.handleChange}>
                                <option value ="choose">Choose</option>
                                <option value = "shortanswer">Short Answer</option>
                                <option value = "match">Match</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="form_width">
                            <Form.Label>Exam Question Number</Form.Label>
                            <Form.Control type="number" placeholder="Total Number" name= "question_number" value={this.state.input.question_number} onChange={e => { this.handleChange(e); this.renderInput(this.state.input.question_number, this.state.input.quiz_question_type) }} />
                        </Form.Group> 
                        {this.state.divItems}   
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle" onClick={this.addQuiz}>Add Exam</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )

    }
}