const QuizResultController = require('../controller/QuizResultController');
const QuizResult = require("../Models/QuizResult")
const QuizResultRepository = require("../repository/QuizResultRepository")
const QuizResultService = require("../service/QuizResultService")

const Question = require("../Models/Question")
const QuestionRepository = require("../repository/QuestionRepository")
const QuestionService = require("../service/QuestionService")

const QuizAnswer = require("../Models/QuizAnswer")
const QuizAnswerRepository = require("../repository/QuizAnswerRepository")
const QuizAnswerService = require("../service/QuizAnswerService")

const Quiz = require("../Models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../service/QuizService")

const Student = require("../Models/Student")
const StudentRepository = require("../repository/StudentRepository")
const StudentService = require("../service/StudentService")

const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const bodyParser = require("body-parser");
module.exports = (server) => {
    server.use(bodyParser.json())

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)
   
   
    const quizResultRepo = new QuizResultRepository(QuizResult)
    const quizResultServ = new QuizResultService(quizResultRepo)
    
    const quizAnswerRepo = new QuizAnswerRepository(QuizAnswer)
    const quizAnswerServ = new QuizAnswerService(quizAnswerRepo)

    const questionRepo = new QuestionRepository(Question)
    const questionServ = new QuestionService(questionRepo)
    
    const quizRepo = new QuizRepository(Quiz)
    const quizServ = new QuizService(quizRepo)

    const studentRepo = new StudentRepository(Student)
    const studentServ = new StudentService(studentRepo)

    server.post("/getQuizResult", 
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new QuizResultController(quizServ, quizAnswerServ, questionServ, quizResultServ, userServ, studentServ).checkResultForQuiz)

    server.post("/getEntranceQuizResult", 
     //   new UserController(userServ, roleServ).verifyToken,
      //  new UserController(userServ, roleServ).authRole("STUDENT"),
        new QuizResultController(quizServ, quizAnswerServ, questionServ, quizResultServ,  userServ, studentServ).checkEntranceQuiz)

    server.get("/getAverage", 
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new QuizResultController(quizServ, quizAnswerServ, questionServ, quizResultServ, userServ, studentServ).getAverage)



}