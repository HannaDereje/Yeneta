const Student = require("../models/Student")
const StudentRepository = require("../repository/StudentRepository")
const StudentService = require("../services/StudentService")

const ContentManager = require("../models/ContentManager")
const ContentManagerRepository = require("../repository/ContentManagerRepository")
const ContentManagerService = require("../services/ContentManagerService")

const User = require("../models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../services/UserService")

const Lesson = require("../models/Lesson")
const LessonRepository = require("../repository/LessonRepository")
const LessonService = require("../services/LessonService")

const Activity = require("../models/Activity")
const ActivityRepository = require("../repository/ActivityRepository")
const ActivityService = require("../services/ActivityService")

const Quiz = require("../models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../services/QuizService")

const Admin = require("../models/Admin")
const AdminRepository = require("../repository/QuizRepository")
const AdminService = require("../services/QuizService")

const bodyParser = require("body-parser")


module.exports = (server) => {
    server.use(bodyParser.json())

    const studentRepo = new StudentRepository(Student)
    const studentServ = new StudentService(studentRepo)

    const contentManagerRepo = new ContentManagerRepository(ContentManager)
    const contentManagerServ = new ContentManagerService(contentManagerRepo)

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const lessonRepo = new LessonRepository(Lesson)
    const lessonServ = new LessonService(lessonRepo)

    const activityRepo = new ActivityRepository(Activity)
    const activityServ = new ActivityService(activityRepo)

    const quizRepo = new QuizRepository(Quiz)
    const quizServ = new QuizService(quizRepo)

    const adminRepo = new AdminRepository(Admin)
    const adminServ = new AdminService(adminRepo)

    server.post("/approveLesson/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("ADMIN"),
        new AdminController(adminServ, studentServ, contentManagerServ, userServ, lessonServ, activityServ, quizServ).approveLesson)

    server.post("/approveActivity/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("ADMIN"),
        new AdminController(adminServ, studentServ, contentManagerServ, userServ, lessonServ, activityServ, quizServ).approveActivity)

    server.post("/approveQuiz/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("ADMIN"),
        new AdminController(adminServ, studentServ, contentManagerServ, userServ, lessonServ, activityServ, quizServ).approveQuiz)

    server.get("/viewUserInfo",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("ADMIN"),
        new AdminController(adminServ, studentServ, contentManagerServ, userServ, lessonServ, activityServ, quizServ).viewUserInfo)
}