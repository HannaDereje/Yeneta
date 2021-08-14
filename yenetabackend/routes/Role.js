const RoleController = require('../controller/RoleController');
const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../services/RoleService")
const bodyParser = require("body-parser")


module.exports = (server) => {
    server.use(bodyParser.json())

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)
    server.post("/insertRole", new RoleController(roleServ).insert)
    server.get("/getAllRoles", new RoleController(roleServ).getAll)



}