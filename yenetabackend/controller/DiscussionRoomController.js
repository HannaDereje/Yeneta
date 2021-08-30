var options = {
    cors:true, 
    origins:["http://localhost:3000"]
}

const formatMessage = require("./FormatMessage")
const botName = "Yeneta bot"
const users =[]


const socketio = require("socket.io")
class DiscussionRoomController{

    constructor(server){

        var io = socketio(server,options)
        
        io.on("connection", socket=>{

            this.socketMessages(socket, io)
        
        })

        this.userLeave = this.userLeave.bind(this)
        this.userjoin = this.userjoin.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.getTopicUsers = this.getTopicUsers.bind(this)
    }

    socketMessages (socket, io){

        socket.on("joinroom", ({username, topic})=>{
            const user = this.userjoin(socket.id, username, topic)
            socket.join(user.topic)

            console.log(user)
            socket.emit("message", formatMessage(botName, "Welcome to Yeneta Discussion Room"))
            socket.broadcast.to(user.topic).emit("message", formatMessage(botName, `A ${user.username} has joined the chat`))

            io.to(user.topic).emit("TopicUsers",{
                topic:user.topic,
                users:this.getTopicUsers()
            })
            
        })

         
      
        socket.on("disconnect", ()=>{

            const user = this.userLeave(socket.id)
            if(user){
                io.to(user.topic).emit("message", formatMessage(botName,`A ${user.username} has left the chat`))
            
                io.to(user.topic).emit("TopicUsers",{
                    topic:user.topic,
                    users:this.getTopicUsers()
                })
            }

        })
    
        socket.on("chatMessage", msg=>{

            const user = this.getCurrentUser(socket.id)
            console.log(user)
            io.emit("chatMessage", formatMessage(user.username, msg))
        })

        socket.on("likedMessage", ({time, like, message})=>{
            socket.broadcast.emit("likedMessage", 
            {time,like, message})

        })

    }

    userjoin(socket_id, username, topic){

        const user = {socket_id, username, topic}

        users.push(user)
        return users;
       
      
    }

    

    userLeave(id){

        const index = users.findIndex(user => user.socket_id === id)
        if(index !== -1){
            return users.splice(index, 1)[0]
        }
    }

    getCurrentUser(id){
        console.log(users)
        return users.find(user => user.socket_id===id)
    }

    getTopicUsers(){
        return users
    }

    
    
}


module.exports = DiscussionRoomController;