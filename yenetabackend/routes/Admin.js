const Student = require("../Models/Student")
const StudentRepository = require("../repository/StudentRepository")
const StudentService = require("../services/StudentService")

const ContentManager = require("../Models/ContentManager")
const ContentManagerRepository = require("../repository/ContentManagerRepository")
const ContentManagerService = require("../services/ContentManagerService")

const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../services/UserService")

const Lesson = require("../Models/Lesson")
const LessonRepository = require("../repository/LessonRepository")
const LessonService = require("../services/LessonService")

const Activity = require("../Models/Activity")
const ActivityRepository = require("../repository/ActivityRepository")
const ActivityService = require("../services/ActivityService")

const Quiz = require("../Models/Quiz")
const QuizRepository = require("../repository/QuizRepository")
const QuizService = require("../services/QuizService")

const Admin = require("../Models/Admin")
const AdminRepository = require("../repository/QuizRepository")
const AdminService = require("../services/QuizService")
const AdminController = require("../controller/AdminController")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../services/RoleService")

const UserController = require("../controller/UserController")
const bodyParser = require("body-parser")


module.exports = (server) => {
    server.use(bodyParser.json())

    const studentRepo = new StudentRepository(Student)
    const studentServ = new StudentService(studentRepo)

    const contentManagerRepo = new ContentManagerRepository(ContentManager)
    const contentManagerServ = new ContentManagerService(contentManagerRepo)

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

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