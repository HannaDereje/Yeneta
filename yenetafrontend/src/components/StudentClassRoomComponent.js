import React, { Component } from 'react'
import { Card, Form, Button} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'
import Topic from "./TopicComponent"
import axios from "axios"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'

export default class ClassRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lesson: false,
            les: "",
            topic:"",
            user:"",
            topics:[],
            quizQuestions:[],
            quiz:[], 
            todayQuiz:[],
            quizTaken:false,
            activityTaken:false,
            number:'',
            content:'',
            answer : {},
            correctOnes:[],
            tobeTaken:"",
            tobelearnt:"",
            activity: "",
            questions2: [],
            lessons: [],
            value: "",
            answers: [],
            result: "",
            total: "",
            availableLessons:[]
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getOne = this.getOne.bind(this)
        this.resetClicks = this.resetClicks.bind(this)
        this.handleLessonsClick = this.handleLessonsClick.bind(this)
        this.handleQuiz = this.handleQuiz.bind(this)
        this.getTopics = this.getTopics.bind(this)
        this.submitAnswerForQuiz = this.submitAnswerForQuiz.bind(this)
        this.handleAnswer = this.handleAnswer.bind(this)
        this.handleLesson = this.handleLesson.bind(this)
        this.handlechat = this.handlechat.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitActivity = this.onSubmitActivity.bind(this)
        this.getAvailableLessons = this.getAvailableLessons.bind(this)
    }

    handleLesson(level, header) {
        
        axios.get(`http://localhost:5000/takeLesson?level=${level}`, { headers: header })
            .then(res => {

                console.log(res.data)
                axios.get("http://localhost:5000/getStudent",  {headers:header})
                .then(response=>{

                var lesson = response.data.Student.lessons
                var tobelearnt = lesson[lesson.length - 1].split("_")[0]
                this.setState({tobelearnt:tobelearnt})

                axios.get(`http://localhost:5000/getLesson/${tobelearnt}`, { headers: header })
                    .then(response => {
                        console.log(response)
                        this.setState({ les: response.data })
                        axios.get(`http://localhost:5000/getActivity/${response.data.activity}`)
                            .then(response => {
                                console.log(response)
                                this.setState({ activity: response.data })
                                const questions = []
                                for (let i = 0; i < response.data.questions.length; i++) {

                                    axios.get(`http://localhost:5000/getQuestion/${response.data.questions[i]}`)
                                        .then(response => {
                                            console.log(response)
                                            questions.push(response.data)


                                            this.setState({ questions2: questions })
                                        })

                                }
                            })
                    })

                })
            })
            .catch(function (error) {
                console.log(error)
            })

        }

    handleQuiz(level, header){

        axios.get(`http://localhost:5000/takeQuiz?level=${level}`, {headers:header})
        .then(res => {
            var ids=[]

            axios.get("http://localhost:5000/getStudent",  {headers:header})
             .then(response=>{

                console.log(response)
                var quiz = response.data.Student.quizes
                var tobeTaken = quiz[quiz.length-1].split("_")[0]
                this.setState({tobeTaken:tobeTaken})

                axios.get(`http://localhost:5000/getQuiz/${tobeTaken}`,  {headers:header})
                    .then(response=>{
                        console.log(response)

                       var questionids= response.data.questions

                       questionids.forEach(element=>{
                           ids.push(element)
                       })

                       console.log(ids)

                     axios.post("http://localhost:5000/getMany", {ids:ids}, {headers:header})  
                           .then(response=>{
                               console.log(response.data)

                               this.setState({todayQuiz: response.data})
                           })
                    })

             })
        })
        .catch(function (error) {
            console.log(error)
        }) 

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




    getTopics(){

        axios.get(`http://localhost:5000/getAllTopics`)
        .then(res => {

            this.setState({topics:res.data})
            console.log(res.data)
        })
        .catch(function (error) {
            console.log(error)
        }) 

    }




    onSubmitActivity(e) {
        e.preventDefault()
        let j = 0
        let a1 = this.state.answers

        console.log(this.state.tobelearnt)

        for (var i = 0; i < this.state.questions2.length; i++) {

            let a2 = this.state.questions2[i].answer
            console.log(a2)
            if (a1[i] == a2) {
                j = j + 1
                if (j == this.state.questions2.length) {
                    this.setState({
                        comment: "Excellent/እጅግ በጣም ጥሩ"

                    })

                }

            }
        }
        
        var info ={
            result:j,
            activity:this.state.activity._id,
            id:this.state.tobelearnt
        }
         var header ={
            "x-access-token": localStorage.getItem("token")
        } 

        axios.post("http://localhost:5000/getResult",info, {headers:header})
             .then(res=>{

                this.setState({activityTaken:true})
                this.setState({
                    result: j,
                    total: this.state.questions2.length
                })
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })

       


    }

    handlechat(topic, header){


        axios.get("http://localhost:5000/getCurrentUser", {headers:header})
            .then(res => {
                this.setState({ user: res.data })
                if(topic && topic!== ""){
                    window.location.href=`/room?topic=${topic}&username=${this.state.user.username}&id=${this.state.user._id}`
                }
        })
            .catch(function (error) {
                console.log(error)
        })
    }

    
    componentDidMount() {


        const header ={
            "x-access-token": localStorage.getItem("token")
        }

        const level = new URLSearchParams(this.props.location.search).get("level ")
        console.log(level, this.props)


        this.getAvailableLessons()
        axios.get("http://localhost:5000/getStudent", { headers: header })
            .then(response => {

                var lesson = response.data.Student.lessons

                if(lesson.length==0){
                    this.handleLesson(level, header);
                    
                }
                else if(lesson.length == 3){
                    this.handleQuiz(level, header);
                }
                else{

                    if(lesson[lesson.length - 1].split("_")[1] == "notsubmitted"){
                        this.setState({tobelearnt:lesson[lesson.length - 1].split("_")[0]})

                        axios.get(`http://localhost:5000/getLesson/${lesson[lesson.length - 1].split("_")[0]}`, { headers: header })
                    .then(response => {
                        console.log(response)
                        this.setState({ les: response.data })
                        axios.get(`http://localhost:5000/getActivity/${response.data.activity}`)
                            .then(response => {
                                console.log(response)
                                this.setState({ activity: response.data })
                                const questions = []
                                for (let i = 0; i < response.data.questions.length; i++) {

                                    axios.get(`http://localhost:5000/getQuestion/${response.data.questions[i]}`)
                                        .then(response => {
                                            console.log(response)
                                            questions.push(response.data)


                                            this.setState({ questions2: questions })
                                        })

                                }
                            })
                    })
                    }else{
                        this.handleLesson(level, header);

                }
            }

                            })
            .catch(function (error) {
                console.log(error)
            })

            const topic = new URLSearchParams(this.props.location.search).get('topic')

            this.handlechat(topic, header)
            this.getTopics()
           // this.getQuiz(level, header)


       
    }

    componentDidUpdate(){

    }

    getAvailableLessons(){

        const header ={
            "x-access-token": localStorage.getItem("token")
        }
        axios.get("http://localhost:5000/getAvailable",  {headers:header})
        .then(response=>{
           this.setState({availableLessons:response.data})
           console.log(response.data)
        })
    }



    submitAnswerForQuiz(e){

        e.preventDefault();  
            const info ={
                answer:this.state.answer,
                quiz_id:this.state.tobeTaken
            }
            console.log(info)

            const header ={
                "x-access-token": localStorage.getItem("token")
            }

            axios.post("http://localhost:5000/getQuizResult", info, {headers:header})
                 .then(response=>{
                    this.setState({quizTaken:true})
                    console.log(response.data)


                    this.setState({content:""})
                 })

    }

    resetClicks() {
        this.setState({
            lesson: false,
            les: ""
        })
    }
    handleLessonsClick(id) {
        this.resetClicks();
        this.getOne(id)

    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }
    getOne(id) {
        axios.get(`http://localhost:5000/getLesson/${id}`)
            .then(res => {
                this.setState({ lesson: true })
                this.setState({ les: res.data })
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    handleChange(i, e) {
        let answers = [...this.state.answers]
        answers[i] = e.target.value
        this.setState({ answers })

    }

    


    render() {

        return (

            <StudentNavBar handleShow={this.handleShow} name ="Create Chat">
                <Topic show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose} topics={this.state.topics}></Topic>
                <div className="mainContainer bgpic">

                    <div id="sidebar">
                        <div className="title">
                            <h4 className="text-center">Lessons</h4>
                        </div>

                        <ul>
                            {this.state.availableLessons.map((list, index)=>{

                               return <li onClick={() => this.handleLessonsClick(list.split("_")[0])} >Lesson {index+1}</li>

                            })}
                           
                        </ul>
                    </div>

                   

                    <div id="mainpage">
                        <p className="intro">Basic Introduction</p>
                        
                        <p className="topic" key={this.state.les._id}>{this.state.les.topic}</p>
                        <div className="note_des divsindedent">
                            <p className="title">Notes</p>
                            <CKEditor
                                key={this.state.les._id}
                                data={this.state.les.note}
                                disabled={true}
                                editor={ClassicEditor}
                                config={{
                                    isReadOnly: true,
                                    toolbar: ['']
                                }}


                            />



                        </div>


        
                        <div className="note_des divsindedent">
                            <p className="title">Video Lesson</p>
                            <Card>
                                <Card.Body key={this.state.les._id}>

                                    <iframe X-Frame-Options="sameorigin" src={this.state.les.videoLink} frameborder="0" allowfullscreen></iframe>
                                </Card.Body>
                            </Card>
                        </div>
                        

                        <div className="note_des divsindedent">
                            <p className="title">Today's Activity</p>
                        
                            <Form className="textStyle ">
                      
                            {this.state.questions2.map((e1, i) =>
                                <Form.Group>
                                    <CKEditor
                                        data={e1.content}
                                        editor={ClassicEditor}
                                        disabled={true}
                                        config={{
                                            isReadOnly: true,
                                            toolbar: ['']
                                        }}

                                    />
                                    <br />

                                        <Form.Control  type="text" placeholder="add Answer" onChange={this.handleChange.bind(this, i)} /><br/>
                                </Form.Group>
                            )}
                            <br />

                            <Form.Group className="btnStyle2">
                                 <Button type="submit" onClick={this.onSubmitActivity} className="btnstyle">Submit Answer</Button>
                            </Form.Group>
                            </Form>
                            <br /><br />
                             {this.state.activityTaken === true?<div><div className="text-danger">{this.state.result}/{this.state.total}</div>
                            <div className="text-danger">{this.state.comment}</div></div>:"" }
                            
                        </div>

                        <div>
                        <Form className="textStyle ">
                      
                            {this.state.todayQuiz.map((list, index)=>
                        

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
 
 
                            /> <Form>
                                <Form.Group className="form_width">
                                    <Form.Control type="text" placeholder="add Answer"  name={index+ "_"+list._id} onChange={this.handleAnswer} />
                         </Form.Group>
                         <Form.Group className="btnStyle2">
                            <Button variant="success" onClick={this.submitAnswerForQuiz}>Submit Answer</Button>
                        </Form.Group>
                            </Form>
                            <div></div>
                            </div>
                           

                            <div>
                            {this.state.quizTaken === true?
                            <div><p>{this.state.result}</p><p><a href="">Ready for next Lessson Your Lesson?</a></p></div>: ""  
                            }

                            </div>
                        </div>

                            
                    )}

                        
                    </Form>
                    </div>
                    </div>
                    </div>
              
            </StudentNavBar>
        )

    }

}
