const StudentQuestionController = require('../controller/StudentQuestionController')
const UserController = require("../controller/UserController")

const StudentQuestion = require("../Models/StudentQuestion")
const StudentQuestionRepository = require("../repository/StudentQuestionRepository")
const StudentQuestionService = require("../service/StudentQuestionService")

const ContentManagerAnswer = require("../Models/ContentManagerAnswer")
const ContentManagerAnswerRepository = require("../repository/ContentManagerAnswerRepository")
const ContentManagerAnswerService = require("../service/ContentManagerAnswerService")

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

const contentAnswerRepo = new ContentManagerAnswerRepository(ContentManagerAnswer)
const contentAnswerServ = new ContentManagerAnswerService(contentAnswerRepo)

const bodyParser = require("body-parser")



module.exports = (server) => {
    server.use(bodyParser.json())
   
    server.post("/addQuestion", 
            new UserController(userServ, roleServ).verifyToken,
            new UserController(userServ, roleServ).authRole("STUDENT"),
            new StudentQuestionController(studentServ, userServ, studentQuestionServ, contentAnswerServ).addQuestion)
    server.get("/getProfileInfo", 
            new UserController(userServ, roleServ).verifyToken,
            new UserController(userServ, roleServ).authRole("STUDENT"),
            new StudentQuestionController(studentServ, userServ, studentQuestionServ, contentAnswerServ).getProfileInfo)
    server.get("/getAnswer", 
            new UserController(userServ, roleServ).verifyToken,
            new UserController(userServ, roleServ).authRole("STUDENT"),
            new StudentQuestionController(studentServ, userServ, studentQuestionServ, contentAnswerServ).getAnswer)

    server.get("/getAllQuestionsAnswers", 
            //new UserController(userServ, roleServ).verifyToken,
            //new UserController(userServ, roleServ).authRole("STUDENT"),
            new StudentQuestionController(studentServ, userServ, studentQuestionServ, contentAnswerServ).getAllquestionsandAnswer)


}
