const StudentController = require('../controller/StudentController')
const UserController = require("../controller/UserController")

const Student = require("../Models/Student")
const StudentRepository = require("../repository/StudentRepository")
const StudentService = require("../service/StudentService")

const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const Lesson = require("../Models/Lesson")
const LessonRepository = require("../repository/LessonRepository")
const LessonService = require("../service/LessonService")

const Quiz = require("../Models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../service/QuizService")

const studentRepo = new StudentRepository(Student)
const studentServ = new StudentService(studentRepo)
const userRepo = new UserRepository(User)
const userServ = new UserService(userRepo)
const roleRepo = new RoleRepository(Role)
const roleServ = new RoleService(roleRepo)
const lessonRepo = new LessonRepository(Lesson)
const lessonServ = new LessonService(lessonRepo)
const quizRepo = new QuizRepository(Quiz)
const quizServ = new QuizService(quizRepo)
const bodyParser = require("body-parser")
const multer = require("multer");

const { check, validationResult, body } = require("express-validator")
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });



module.exports = (server) => {
    server.use(bodyParser.json())

    server.post("/addStudent",
        upload.single('image'),
        body('username').notEmpty().isLength(10),
        body('password').isLength({ min: 8 }),
        body('email').isEmail(),
        body('name').notEmpty(),
        body('age').isInt({ max: 18 }),
        body('country').notEmpty(),
        new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ).register)

    server.get("/getStudent",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ).getStudent)

    server.get("/getLesson",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ).getLesson)

    server.post("/takeQuiz",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ).takeQuiz)

    server.get("/getLessonNumber",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("STUDENT"),
        new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ).getAvailableLessonNumber)
}