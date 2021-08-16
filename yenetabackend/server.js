const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");

var options = {
    cors:true, 
    origins:["http://localhost:3000"]
}
const mongoose = require("mongoose");
const activityRoute = require("./routes/Activity")
const activityResultRoute = require("./routes/ActivityResult")
const adminRoute = require("./routes/Admin")
const answerRoute = require("./routes/Answer")
const contentManagerRoute = require("./routes/ContentManager")
const lessonRoute = require("./routes/Lesson")
const questionRoute = require("./routes/Question")
const quizRoute = require("./routes/Quiz")
const quizResultRoute = require("./routes/QuizResult")
const roleRoute = require("./routes/Role")
const studentRoute = require("./routes/Student")
const studentQuestionRoute = require("./routes/StudentQuestion")
const topicRoute = require("./routes/Activity")
const userRoute = require("./routes/User")
class Server {

    constructor() {
        this.Start();
        this.initDB();
        this.initRoutes()

    }

    Start() {
        dotenv.config();
        var server =   app.listen(process.env.PORT, ()=>{
            console.log("The app is listening on port " + process.env.PORT)
        })
        this.initSocket(server, options)
       
    }

    initDB() {

        app.use(cors());
        app.use(bodyParser.json())
        mongoose.connect('mongodb://localhost/yeneta', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        }).then(console.log('connected'))
            .catch((err) => console.log(err));

    }

    initRoutes() {

        activityRoute(app);
        activityResultRoute(app);
        adminRoute(app);
        answerRoute(app);
        contentManagerRoute(app);
        lessonRoute(app);
        questionRoute(app);
        quizRoute(app);
        quizResultRoute(app);
        roleRoute(app);
        studentRoute(app);
        studentQuestionRoute(app);
        topicRoute(app);
        userRoute(app);


    }
    initSocket(server){
        const DiscussionRoomController = require("./controller/DiscussionRoomController")
        const room = new DiscussionRoomController(server)
    }

}

new Server();

