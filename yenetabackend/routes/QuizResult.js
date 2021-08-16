const QuizResultController = require('../controller/QuizResultController');
const QuizResult = require("../Models/QuizResult")
const QuizResultRepository = require("../repository/QuizResultRepository")
const QuizResultService = require("../service/QuizResultService")

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

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)


    const quizResultRepo = new QuizResultRepository(QuizResult)
    const quizResultServ = new QuizResultService(quizResultRepo)

    server.get("/getQuizResult",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new QuizResultController(quizResultServ).checkResultForQuiz)



}