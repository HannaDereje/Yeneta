const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

var options = {
    cors:true, 
    origins:["http://localhost:3000"]
}


class Server{

    constructor(){
        this.Start();
        this.initDB();
        this.initRoutes()
        this.initSocket()
    }

    Start(){
        dotenv.config();
      var server =   app.listen(process.env.PORT, ()=>{
            console.log("The app is listening on port " + process.env.PORT)
        })
        this.initSocket(server, options)
       
    }

    initDB(){
        
        app.use(express.json());
        app.use(cors());
       // mongodb+srv://yenetaUser:hhhk1234@yeneta.ablnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
        app.use(bodyParser.json())
        mongoose.connect('mongodb://localhost/blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        
        }).then(console.log('connected'))
            .catch((err) => console.log(err));
        
    }

    initRoutes(){

        app.use(express.static("QuizImages"))
        app.use(express.static("uploads"))
        
        const studentRegisterRoute = require("./routes/Student")
        studentRegisterRoute(app)
        const login = require("./routes/User")
        login(app)
        const teacherRegisterRoute = require("./routes/ContentManager")
        teacherRegisterRoute(app)
        const askQuestion = require("./routes/StudentQuestion")
        askQuestion(app)
        const quiz = require("./routes/Quiz")
        quiz(app)
        const Question = require("./routes/Question")
        Question(app)
        const answer = require("./routes/Answer")
        answer(app)
        const quizResult = require("./routes/QuizResult")
        quizResult(app)
        const topic = require("./routes/Topic")
        topic(app)
        const admin = require("./routes/Admin")
        admin(app)
        const lesson = require("./routes/Lesson")
        lesson(app)
        const activity = require("./routes/Activity")
        activity(app)
        const room = require("./routes/DiscussionRoom")
        room(app)
        const messages = require("./routes/message")
        messages(app)
        const activityResult = require("./routes/ActivityResult")
        activityResult(app)
    }

    initSocket(server){
        const DiscussionRoomController = require("./controller/DiscussionRoomController")
        const room = new DiscussionRoomController(server)
        


    }


}

new Server();