const ActivityResultController = require('../controller/ActivityResultController');
const ActivityResult = require("../Models/ActivityResult")
const ActivityResultRepository = require("../repository/ActivityResultRepository")
const ActivityResultService = require("../repository/ActivityResultRepository")

const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const bodyParser = require("body-parser")


module.exports = (server) => {
    server.use(bodyParser.json())

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)
   
    const activityResultRepo = new ActivityResultRepository(ActivityResult)
    const activityResultServ = new ActivityResultService(activityResultRepo)

    server.get("/getActivityResult", 
            new UserController(userServ, roleServ).verifyToken,
            new UserController(userServ, roleServ).authRole("STUDENT"),
            new ActivityResultController(activityResultServ).checkResultForActivity)



}