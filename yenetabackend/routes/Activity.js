const ActivityController = require('../controller/ActivityController');
const Activity = require("../Models/Activity")
const ActivityRepository = require("../repository/ActivityRepository")
const ActivityService = require("../services/ActivityService")

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

    const activityRepo = new ActivityRepository(Activity)
    const activityServ = new ActivityService(activityRepo)

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    server.post("/insertActivity",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ActivityController(activityServ).insert)

    server.get("/getAllActivities",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ActivityController(activityServ).getAll)

    server.get("/getActivity/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ActivityController(activityServ).getOne)

    server.put("/updateActivity/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ActivityController(activityServ).updateOne)
    server.delete("/deleteActivity/:id",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ActivityController(activityServ).deleteOne)
    server.delete("/deleteActivities",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ActivityController(activityServ).deleteAll)


}