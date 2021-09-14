const UserController = require('../controller/UserController');
const User = require("../Models/User")
const UserRepository = require("../repository/UserRepository")
const UserService = require("../service/UserService")

const Role = require("../Models/Role")
const RoleRepository = require("../repository/RoleRepository")
const RoleService = require("../service/RoleService")

const DiscussionRoom = require("../Models/DiscussionRoom")
const DiscussionRoomRepository = require("../repository/DiscussionRoomRepository")
const DiscussionRoomService = require("../service/DiscussionRoomService")

const DiscussionRoomController = require('../controller/DiscussionRoomController');
const bodyParser = require("body-parser")


module.exports = (server) => {
    server.use(bodyParser.json())
    
    const discussionRoomRepo = new DiscussionRoomRepository(DiscussionRoom)
    const discussionRoomServ = new DiscussionRoomService(discussionRoomRepo)

    const userRepo = new UserRepository(User)
    const userServ = new UserService(userRepo)

    const roleRepo = new RoleRepository(Role)
    const roleServ = new RoleService(roleRepo)


    server.get("/getAllRooms", (req, res)=>{
        return discussionRoomServ.getAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    })

    server.delete("/deleteRoom", (req, res)=>{
        return discussionRoomServ.deleteAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    })


}