const MessageController = require('../controller/MessageController');
const Message = require("../Models/Messages")
const MessageRepository = require("../repository/MessageRepository")
const MessageService = require("../service/MessageService")
const messageRepo = new MessageRepository(Message)
const messageServ = new MessageService(messageRepo)
const bodyParser = require("body-parser")
module.exports = (server) => {
    server.use(bodyParser.json())
    
    server.post("/insertMessage", new MessageController(messageServ).insert)
    server.get("/getAllMessage", new MessageController(messageServ).getAll)
    server.get("/getMessage/:id", new MessageController(messageServ).getOne)
    server.put("/updateMessage/:id", new MessageController(messageServ).updateOne)
    server.delete("/deleteMessage/:id", new MessageController(messageServ).deleteOne)
    server.delete("/deleteMessages", new MessageController(messageServ).deleteAll)
}