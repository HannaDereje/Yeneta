const UserController = require("../controller/UserController")
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")


const { check, validationResult, body } = require("express-validator")
const bodyParser = require("body-parser")

const userRepo = new UserRepository(User)
const userServ = new UserService(userRepo)


const roleRepo = new RoleRepository(Role)
const roleServ = new RoleService(roleRepo)

module.exports = (server) => {
    server.use(bodyParser.json())

    server.put("/confirm/:accessToken", new UserController(userServ, roleServ).verifyUser)

    server.post("/login",
        body('email').isEmail().notEmpty(),
        body('password').isLength({ min: 8 }),
        new UserController(userServ, roleServ).login)

}