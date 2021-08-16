const ContentManagerController = require('../controller/ContentManagerController');
const ContentManager = require("../Models/ContentManager")
const ContentManagerRepository = require("../repository/ContentManagerRepository")
const ContentManagerService = require("../services/ContentManagerService")

const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../services/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../services/RoleService")

const bodyParser = require("body-parser")
const { check, validationResult, body } = require("express-validator")



module.exports = (server) => {
    server.use(bodyParser.json())

    const contentRepo = new ContentManagerRepository(ContentManager)
    const contentServ = new ContentManagerService(contentRepo)

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)

    server.post("/registerTeacher",
        body('username').notEmpty().isLength(10),
        body('password').isLength({ min: 8 }),
        body('email').isEmail(),
        body('name').notEmpty(),
        body('job').notEmpty(),
        body('experience').notEmpty(),
        new ContentManagerController(contentServ, userServ, roleServ).register)

    server.get("/getProfile",
        new UserController(userServ, roleServ).verifyToken,
        new UserController(userServ, roleServ).authRole("TEACHER"),
        new ContentManagerController(contentServ, userServ, roleServ).getProfileInfo)



}