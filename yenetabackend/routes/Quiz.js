const QuizController = require('../controller/QuestionController');
const Quiz = require("../Models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../service/QuizService")
const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")
const bodyParser = require("body-parser")

module.exports = (server) => {
    server.use(bodyParser.json())

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)
    const quizRepo = new QuizRepository(Quiz)
    const quizServ = new QuizService(quizRepo)
    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    server.post("/insertQuiz",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new QuizController(quizServ).insert)

    server.get("/getAllQuizes",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new QuizController(quizServ).getAll)

    server.get("/getQuiz/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new QuizController(quizServ).getOne)

    server.put("/updateQuiz/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new QuizController(quizServ).updateOne)

    server.delete("/deleteQuiz/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new QuizController(quizServ).deleteOne)

    server.delete("/deleteQuizes",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new QuizController(quizServ).deleteAll)
}