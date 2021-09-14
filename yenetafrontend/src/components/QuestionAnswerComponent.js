import React, {Component } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"


import axios from "axios"

export default class Questions extends Component{

    constructor(){
        super()
        this.state = {

            input:{},
            errors:{},
            questionsAndAnswers:[],
            answer:{},
            number:0,
            content:"",
            savedAnswer:"",
            answeredQuestion:[]
        }

        this.handleChange = this.handleChange.bind(this)
        this.answer = this.answer.bind(this)
        this.listofQuestionsandAnswers = this.listofQuestionsandAnswers.bind(this)
    }

    handleChange(e){

        let answer = this.state.answer

        
        this.setState({number : e.target.name
            , content:e.target.value})
        
        answer[this.state.number] = this.state.content

        this.setState({
            answer:answer
        })
    }

    answer(e){
        
        e.preventDefault();
        
        const info={
                answer:this.state.answer
            }
    
            console.log(info)
            const header ={
                "x-access-token": localStorage.getItem("token")
            }
             axios.post("http://localhost:5000/insertAnswer", info, {headers:header})
            .then(response=>{
                
                this.setState({savedAnswer:response.data.answer})
                  console.log(response.data)
            }) 
            
        

    }

    validate(){

        let input = this.state.input;
        let errors ={}
        let isValid = true;

        if(!input["answer"]){
            isValid = false;
            errors["answer"] = "Please enter your Answer here.";
        }

        this.setState({
            errors: errors
          });
      
        return isValid;

    }

    listofQuestionsandAnswers(){

        const header ={
            "x-access-token": localStorage.getItem("token")
        }


        axios.get("http://localhost:5000/getAllQuestionsAnswers", {headers:header})
        .then(response=>{

            console.log(response)

             response.data.questions.forEach(element => {
                
                    const answered = response.data.answers.filter(answer =>  answer["question"] == element._id)
                    console.log(answered)
                    if(answered.length !== 0){

                        var all=[]
                        var id= answered._id
                        var concated = {}

                        concated["question"]= element.userquestion
                        concated["answer"] = answered[0].answer
                        all.push(concated)
                        console.log(all)
                        
                this.setState({questionsAndAnswers : this.state.questionsAndAnswers.concat(all)})
                    
                }
                else{
                    var concated = {}
                    var all=[]
                    concated["id"]=element._id
                    concated["question"]= element.userquestion
                    concated["answer"]= "Not answered yet"
                    all.push(concated)
                this.setState({questionsAndAnswers : this.state.questionsAndAnswers.concat(all)})

                
                  
            }
            console.log(this.state.questionsAndAnswers)
                 
            });
                
            })
        
           
    }
    
    componentDidUpdate(){   
//        console.log(this.state.savedAnswer)

    }

    componentDidMount(){

        this.listofQuestionsandAnswers()
    }
    render(){
        return (
            <div className="questionstyle">


                <h4 className="text-center">List of Question and Answer</h4>
                
                {this.state.questionsAndAnswers.map((list, index)=>
                <div>

                <div className="messageStyle">       
                    <div className="textStyle text-danger"><h6 className="usernameStyle">Question:</h6>{list.question}</div>    
                </div>
                 {list.answer === "Not answered yet"?
                    <Form>
                    <Form.Group className="form_width">
                        <Form.Label>Answer</Form.Label>
                        <p><textarea placeholder = "Answer" className="areawidth" name={index+ "_"+list.id} value = {this.state.input.answer} onChange={this.handleChange} cols="70" rows="4"></textarea></p>
                        
                    </Form.Group>
                    <Form.Group className="form_width btnstyle">
                        <Button type="submit" className="btnstyle" onClick={this.answer}>Answer</Button>
                    </Form.Group>
                </Form>:    
                    <div className="answerStyle">  
                    <h6 className="usernameStyle text-success">Answer:</h6>
                    <p className="textStyle text-success">{list.answer}</p>    
                </div>
            }
                

                </div>
                )}
                
               
                   
            </div>
        )
    }
}