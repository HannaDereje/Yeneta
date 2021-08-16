var options = {
    cors:true, 
    origins:["http://localhost:3000"]
}

const formatMessage = require("./FormatMessage")
const botName = "Yeneta bot"

const socketio = require("socket.io")
class DiscussionRoomController{

    constructor(server){

  
        var io = socketio(server,options)
        io.on("connection", socket=>{

            this.welcome(socket)
            this.disconnect(socket, io)
            this.chatMessage(socket, io)
        })
    }

    welcome (socket){
        socket.broadcast.emit("message", formatMessage(botName, "A user has joined the chat"))
    }

    disconnect(socket, io){
        socket.on("disconnect", ()=>{
            io.emit("message", formatMessage(botName,"A user has left the chat"))
        })
    }

    chatMessage(socket, io){
        socket.on("chatMessage", msg=>{
            console.log(msg)
            io.emit("chatMessage", formatMessage("USER", msg))
        })
      
    }
}


module.exports = DiscussionRoomController;