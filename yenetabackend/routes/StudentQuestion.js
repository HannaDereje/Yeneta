const StudentQuestionController = require('../controller/StudentQuestionController')
const UserController = require("../controller/UserController")

const StudentQuestion = require("../Models/StudentQuestion")
const StudentQuestionRepository = require("../repository/StudentQuestionRepository")
const StudentQuestionService = require("../service/StudentQuestionService")

const Student = require("../Models/Student")
const StudentRepository = require("../repository/StudentRepository")
const StudentService = require("../service/StudentService")

const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const studentQuestionRepo = new StudentQuestionRepository(StudentQuestion)
const studentQuestionServ = new StudentQuestionService(studentQuestionRepo)

const studentRepo = new StudentRepository(Student)
const studentServ = new StudentService(studentRepo)

const userRepo = new UserRepository(User)
const userServ = new UserService(userRepo)

const roleRepo = new RoleRepository(Role)
const roleServ = new RoleService(roleRepo)

const bodyParser = require("body-parser")



module.exports = (server) => {
    server.use(bodyParser.json())

    server.post("/addQuestion",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentQuestionController(studentServ, userServ, studentQuestionServ).addQuestion)
    server.get("/getProfileInfo",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentQuestionController(studentServ, userServ, studentQuestionServ).getProfileInfo)
    server.get("/getAnswer",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentQuestionController(studentServ, userServ, studentQuestionServ).getAnswer)

}
