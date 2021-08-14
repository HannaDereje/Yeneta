const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const server = bodyParser();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const activityRoute = require("./routes/Activity")
const activityResultRoute = require("./routes/ActivityResult")
const adminRoute = require("./routes/Admin")
const answerRoute = require("./routes/Answer")
const contentManagerRoute = require("./routes/ContentManager")
//const discussionRoute = require("./routes/Discussionroom")
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
        app.listen(5000, () => {
            console.log("The app is listening on port " + 5000)
        })
    }

    initDB() {

        app.use(express.json());
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
        //discussionRoute(app);
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


}

new Server();

