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

const ActivityResult = require("../Models/ActivityResult")
const ActivityResultRepository = require("../repository/ActivityResultRepository")
const ActivityResultService = require("../service/ActivityResultService")

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

const activityResultRepo = new ActivityResultRepository(ActivityResult)
const activityResultServ = new ActivityResultService(activityResultRepo)

const bodyParser = require("body-parser")
const multer = require("multer");

const {check, validationResult, body} = require("express-validator")



const storage = multer.diskStorage({

    destination:function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage:storage});



module.exports = (server) => {
    server.use(bodyParser.json())
   
    server.post("/register",
        upload.single('image'),
        body('username').notEmpty().isLength(10),
        body('password').isLength({min:8}),
        body('email').isEmail(),
        body('name').notEmpty(),
        body('age').isInt({max:18}),
        body('country').notEmpty(),
     new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).register)

    server.get("/getStudent", 
                new UserController(userServ, roleServ).verifyToken, 
                new UserController(userServ, roleServ).authRole("STUDENT"), 
                new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).getStudent)

    server.get("/getStudentBefore", 
                //new UserController(userServ, roleServ).verifyToken, 
                //new UserController(userServ, roleServ).authRole("STUDENT"), 
                new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).getStudentBeforeLogin)


    server.put("/updateStudent", 
                new UserController(userServ, roleServ).verifyToken, 
                new UserController(userServ, roleServ).authRole("STUDENT"), 
                new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).updateStudent)


    server.get("/takeLesson", 
                new UserController(userServ, roleServ).verifyToken, 
                new UserController(userServ, roleServ).authRole("STUDENT"), 
                new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).getLesson)

    server.get("/takeQuiz", 
                new UserController(userServ, roleServ).verifyToken, 
                new UserController(userServ, roleServ).authRole("STUDENT"),
                new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).takeQuiz)


    server.post("/getResult", 
             new UserController(userServ, roleServ).verifyToken, 
             new UserController(userServ, roleServ).authRole("STUDENT"), 
             new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).updateOnSubmission)

    server.get("/getAvailable", 
             new UserController(userServ, roleServ).verifyToken, 
             new UserController(userServ, roleServ).authRole("STUDENT"), 
             new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).getAvailableLessons)

    server.get("/getAllStudent",
             new UserController(userServ, roleServ).verifyToken,
             new UserController(userServ, roleServ).authRole("ADMIN"),
             new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).getAll)
     
    server.put("/updateStudentOnCertificate",
             new UserController(userServ, roleServ).verifyToken,
             new UserController(userServ, roleServ).authRole("STUDENT"),
             new StudentController(studentServ, userServ, roleServ, lessonServ, quizServ, activityResultServ).updateOnCertificate)
     

}