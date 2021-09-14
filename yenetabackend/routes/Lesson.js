const Lesson = require("../Models/lesson")
const LessonRepository = require("../repository/LessonRepository")
const LessonService = require("../service/LessonService")
const ActivityRepository = require("../repository/ActivityRepository")
const ActivityService = require("../service/ActivityService")
const QuestionRepository = require("../repository/QuestionRepository")
const QuestionService = require("../service/QuestionService")
const LessonController = require("../controller/LessonController")
const bodyParser = require("body-parser")

const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const Activity = require("../Models/Activity")
const Question = require("../Models/Question")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const ContentManager = require("../Models/ContentManager")
const ContentManagerRepository = require("../repository/ContentManagerRepository")
const ContentManagerService = require("../service/ContentManagerService")

const multiparty = require("connect-multiparty")

const MultipartyMiddleware = multiparty({ uploadDir: './uploads' })


module.exports = (server) => {
    server.use(bodyParser.json())

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    const lessonRepo = new LessonRepository(Lesson)
    const lessonServ = new LessonService(lessonRepo)

    const activityRepo = new ActivityRepository(Activity)
    const activityServ = new ActivityService(activityRepo)

    const questionRepo = new QuestionRepository(Question)
    const questionServ = new QuestionService(questionRepo)

    const contentRepo = new ContentManagerRepository(ContentManager)
    const contentServ = new ContentManagerService(contentRepo)

    const path = require("path")
    const fs = require("fs")

    server.post("/addPicture", MultipartyMiddleware, (req, res) => {

        if (req.files) {
            var tempFile = req.files.upload
            var tempPathFile = tempFile.path;

            const targetPathUrl = path.join(__dirname, "../LessonsImages/" + tempFile.name)

            if (path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {
                fs.rename(tempPathFile, targetPathUrl, err => {

                    res.status(200).json({

                        uploaded: true,
                        url: `http://localhost:5000/${tempFile.originalFilename}`
                    })

                    if (err) return console.log(err)
                })
            }
        }

    })
    server.post("/insertLesson",

        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).insert
    )
    server.get("/getAllLessons",
        // new UserController(userServ, roleServ).verifyToken,
        // new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).getAll)

    server.get("/getLesson/:id",
        //new UserController(userServ, roleServ).verifyToken,
        //new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).getOne)
   /*  server.put("/approveLesson/:id",
        //new UserController(userServ, roleServ).verifyToken,
        //new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ).approveLesson)
 */

    server.put("/updateLesson/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).updateOne)

    server.delete("/deleteLesson/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).deleteOne)

    server.delete("/deleteLessons",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).deleteAll)

    server.get("/teachersLessons",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ, activityServ, questionServ, contentServ, userServ).getTeachersLesson)

}
