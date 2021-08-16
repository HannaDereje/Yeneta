const AnswerController = require('../controller/AnswerController');
const Answer = require("../Models/ContentManagerAnswer")
const AnswerRepository = require("../repository/ContentManagerRepository")
const AnswerService = require("../services/ContentManagerAnswerService")
const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../services/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../services/RoleService")

const bodyParser = require("body-parser")


module.exports = (server) => {
    server.use(bodyParser.json())

    const answerRepo = new AnswerRepository(Answer)
    const answerServ = new AnswerService(answerRepo)

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    server.post("/insertAnswer",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new AnswerController(answerServ).insert)

    server.get("/getAllAnswers",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new AnswerController(answerServ).getAll)

    server.get("/getAnswer/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new AnswerController(answerServ).getOne)

    server.put("/updateAnswer/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new AnswerController(answerServ).updateOne)

    server.delete("/deleteAnswer/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new AnswerController(answerServ).deleteOne)

    server.delete("/deleteAllAnswers",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new AnswerController(answerServ).deleteAll)




}