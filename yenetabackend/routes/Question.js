const QuestionController = require('../controller/QuestionController');
const Question = require("../Models/Question")
const QuestionRepository = require("../repository/QuestionRepository")
const QuestionService = require("../services/QuestionService")
const questionRepo = new QuestionRepository(Question)
const questionServ = new QuestionService(questionRepo)
const bodyParser = require("body-parser")
module.exports = (server) => {
    server.use(bodyParser.json())

    server.post("/insertQuestion", new QuestionController(questionServ).insert)
    server.get("/getAllQuestions", new QuestionController(questionServ).getAll)
    server.get("/getQuestion/:id", new QuestionController(questionServ).getOne)
    server.put("/updateQuestion/:id", new QuestionController(questionServ).updateOne)
    server.delete("/deleteQuestion/:id", new QuestionController(questionServ).deleteOne)
    server.delete("/deleteQuestions", new QuestionController(questionServ).deleteAll)
}