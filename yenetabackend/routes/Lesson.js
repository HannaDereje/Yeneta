const Lesson = require("../Models/lesson")
const LessonRepository = require("../repository/LessonRepository")
const LessonService = require("../services/LessonService")
const LessonController = require("../controller/LessonController")
const bodyParser = require("body-parser")

const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../services/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../services/RoleService")


module.exports = (server) => {
    server.use(bodyParser.json())

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    const lessonRepo = new LessonRepository(Lesson)
    const lessonServ = new LessonService(lessonRepo)

    server.post("/addLesson",
        //new UserController(userServ, roleServ).verifyToken,
        //new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ).insert)

    server.get("/getAllLessons",
        //new UserController(userServ, roleServ).verifyToken,
        //new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ).getAll)

    server.get("/getLesson/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ).getOne)

    server.put("/updateLesson/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ).updateOne)

    server.delete("/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ).deleteOne)

    server.delete("/deleteLessons",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new LessonController(lessonServ).deleteAll)
}
