import React, { Component } from 'react'
import { Card, Form, Button} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import StudentNavBar from "./StudentNavComponent"
import '../css/register.css'
import Topic from "./TopicComponent"
import axios from "axios"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import moment from "moment"

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
            availableLessons:[],
            nolessons:"",
            nolessonsleft:false,
            joinchat:false,
            joinchatText:"", 
            zerolesson:'',
            allowedTime:"0",
            noSpareTime:'',
            time:"",
            image:"",
            level:''
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
        this.availLesson = this.availLesson.bind(this)
        this.compareAllowedWithNow = this.compareAllowedWithNow.bind(this)
    }

    handleLesson() {

        this.setState({todayQuiz:[], quizTaken:false})

        const header ={
                "x-access-token": localStorage.getItem("token")
            }
    
            const level = new URLSearchParams(this.props.location.search).get("level ")
            
            axios.get(`http://localhost:5000/takeLesson?level=${level}`, { headers: header })
                .then(res => {
                    console.log(res)
    
                    if(res.data == "No Available Lesson"){

                        this.setState({nolessons:"No Available Lesson", nolessonsleft:true})
                    }else{
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
                }
                })
                .catch(function (error) {
                    console.log(error)
                })
    
            }

        
    handleQuiz(){

                const header ={
                    "x-access-token": localStorage.getItem("token")
                }
        
                const level = new URLSearchParams(this.props.location.search).get("level ")
                

                axios.get(`http://localhost:5000/takeQuiz?level=${level}`, {headers:header})
                .then(res => {
                    var ids=[]
        
                    axios.get("http://localhost:5000/getStudent",  {headers:header})
                     .then(response=>{
        
                        var quiz = response.data.Student.quizes
                        var tobeTaken = quiz[quiz.length-1].split("_")[0]
                        this.setState({tobeTaken:tobeTaken})
        
                        axios.get(`http://localhost:5000/getQuiz/${tobeTaken}`,  {headers:header})
                            .then(response=>{
                                this.setState({allowedTime:response.data.allowedTime})
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

   

    

    availLesson(){

                var header ={
                    "x-access-token": localStorage.getItem("token")
                } 
                
                const level = new URLSearchParams(this.props.location.search).get("level ")

        
                axios.get("http://localhost:5000/getStudent", { headers: header })
                .then(response => {
                    console.log(response.data)
                    var lesson = response.data.Student.lessons
                    var quiz = response.data.Student.quizes

                    if(quiz.length == 3){

                        window.location.href = "/"
                        URLSearchParams.set("level ", "Intermediate")
                        this.handleLesson()
                    }
                    if(quiz.length == 6){
                        URLSearchParams.set("level ", "Advanced")
                        this.handleLesson()
                    }
                    
                    if(lesson.length % 3 == 0 && lesson.length >0 && lesson[lesson.length - 1].split("_")[1] == "submitted"){
                       
                        if((quiz.length/lesson.length) == (1/3) && quiz[quiz.length - 1].split("_")[1] == "submitted"){
                            this.handleLesson();
                        }else{
                            this.handleQuiz();
                            this.compareAllowedWithNow()
                        }
                        
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
                            this.handleLesson();
        
                    }
                }
        
                                })
                .catch(function (error) {
                    console.log(error)
                })
        
            }

    


     handlechat(){

                var header ={
                    "x-access-token": localStorage.getItem("token")
                } 
            
                axios.get("http://localhost:5000/getAllRooms")
                                .then(room=>{
                                    if(room.data.length > 0 && room.data[0].topic !== ""){
                                          console.log(room.data[0])
                                        this.setState({joinchat:true, joinchatText:"JoinChat", topic:room.data[0].topic})
                        
                                    } else{

                                        
                                        const topic = new URLSearchParams(this.props.location.search).get("topic")
                                        this.setState({ joinchat:false, joinchatText:"CreateChat", topic:topic});
                                        
                                    }
                                
                                   
                                })                                   
                            
                           
                                .catch(function (error) {
                                    console.log(error)
                            })
                      
                
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

    compareAllowedWithNow(){


        if(this.state.allowedTime !== ""){
      
            var count = moment().format('hh:mm a')
            var time = moment().add(15, 'minutes').format('hh:mm a')

            setInterval(() => {
                
                count = moment().format('hh:mm a')
                  var x = moment.utc(moment(time, "HH:mm:ss").diff(moment(count, "HH:mm:ss"))).format("mm")
                  this.setState({now:x})
                  console.log(x)

                  if(x == 0){

                    this.setState({noSpareTime:"Time is up!!"})
                    this.submitAnswerForQuiz()
                    alert("Time is up")
                    window.location.reload()
                }
            }, 1000);
              
            
        }
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
        
    getOne(id) {
                axios.get(`http://localhost:5000/getLesson/${id}`)
                    .then(res => {
                        this.setState({ lesson: true })
                        this.setState({ les: res.data })

                        axios.get(`http://localhost:5000/getActivity/${res.data.activity}`)
                                .then(response => {
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
        })
        .catch(function (error) {
            console.log(error)
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

handleChange(i, e) {
    let answers = [...this.state.answers]
    answers[i] = e.target.value
    this.setState({ answers })

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
    
    if(this.state.joinchatText == "CreateChat"){
        
        this.setState({show: true });
        
    }else{
        
        this.setState({show: false });
    }

    var header ={
        "x-access-token": localStorage.getItem("token")
    } 

    axios.get("http://localhost:5000/getCurrentUser", {headers:header})
    .then(res => {
        this.setState({ user: res.data })
        
        if(this.state.topic && this.state.topic!== ""){
            window.location.href=`/room?topic=${this.state.topic}&username=${this.state.user.username}&id=${this.state.user._id}`
        }
})
                    
    
}

handleClose() {
    
    this.setState({ show: false });
}


   

    componentDidUpdate(){

    }


    componentDidMount() {

        const header ={
            "x-access-token": localStorage.getItem("token")
        }

        const level = new URLSearchParams(this.props.location.search).get("level")


        this.getAvailableLessons()
        axios.get("http://localhost:5000/getStudent", { headers: header })
            .then(response => {

                this.setState({image:response.data.Student.image})
                var lesson = response.data.Student.lessons

                if(lesson.length==0){
                    this.handleLesson();
                    
                }else{
                    this.availLesson()
                }
                

                })
            .catch(function (error) {
                console.log(error)
            })

            
            this.handlechat()
            this.getTopics()
           // this.getQuiz(level, header)
          
          

       
    }



    render() {
    
        return (

            <StudentNavBar handleShow={this.handleShow} name ={this.state.joinchatText} image = {"http://localhost:5000/"+ this.state.image}>
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
                    {this.state.todayQuiz.length == 0  ?
                    <div>
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
                             {this.state.activityTaken === true?<div><div className="text-danger">{this.state.result}/{this.state.total}</div>
                            <div className="text-danger">{this.state.comment}</div><div className="text-primary" onClick={()=>{this.handleLesson(); window.location.reload()}}>Are you ready to take the next lesson?</div></div>:"" }
                            
                            {this.state.nolessonsleft === true?<div>No next lesson Available Please look the previous one in the meantime</div>:""}
                        </div></div>:

                        <div>
                        <Form className="textStyle ">
                        <h4 className="title top">Today's Quiz</h4>
                        you have {this.state.allowedTime} Minutes from Now. {this.state.now}
                      
                            {this.state.todayQuiz.map((list, index)=>
                        

                            <div className="top widthstyle">
                            
                        <CKEditor
                                key={list._id}
                                data={list.content}
                                disabled={true}
                                editor={ClassicEditor}
                                config={{
                                    isReadOnly: true,
                                    toolbar: ['']
                                }}
 
 
                            /><br/> 
                            <Form.Group>
                                    <Form.Control type="text" placeholder="add Answer"  name={index+ "_"+list._id} onChange={this.handleAnswer} />
                                </Form.Group><br />
                         
                            <div></div>
                            
                           

                            <div>
                            

                            </div>
                        </div>

                            
                    )}
                    {this.state.quizTaken === false?
                        <Form.Group className="btnStyle2">
                            <Button variant="success" onClick={this.submitAnswerForQuiz}>Submit Answer</Button>
                        </Form.Group>:""}

                        {this.state.quizTaken === true?
                            <div><p>{this.state.result}</p><p><a href="" onClick={()=>{this.handleLesson();}}>Ready for next Lessson Your Lesson?</a></p></div>: ""  
                            }
                            
                            {this.state.nolessonsleft === true?<div>No lesson Available Please look the previous one in the meantime</div>:""}
                    </Form>
                    </div>}
                    </div>
                    </div>
              
            </StudentNavBar>
        )

    }

}
