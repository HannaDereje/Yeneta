var options = {
    cors:true, 
    origins:["http://localhost:3000"]
}

const moment = require("moment");

const formatMessage = require("./FormatMessage")
const botName = "Yeneta bot"
const users =[]
var room_id =""

const message = require("../Models/Messages")
const messageRepository = require("../repository/MessageRepository")
const messageService = require("../service/MessageService")

const messageRepo = new messageRepository(message)
const messageServ = new messageService(messageRepo)

const discussionRoom = require("../Models/DiscussionRoom")
const discussionRoomRepository = require("../repository/DiscussionRoomRepository")
const discussionRoomService = require("../service/DiscussionRoomService")

const discussionRoomRepo = new discussionRoomRepository(discussionRoom)
const discussionRoomServ = new discussionRoomService(discussionRoomRepo)

const socketio = require("socket.io")
class DiscussionRoomController{

    constructor(server){

        var io = socketio(server,options)
        
        io.on("connection", socket=>{

            discussionRoomServ.getCount()
                .then(count=>{

                    if(count == 0){
                        var room ={

                            topic:"",
                            start_time: moment().format('h:mm a'),
                            expire_time:moment().add(15, 'minutes').format('hh:mm a'),
                            status:"Started",
                            usernames:[],
                            users:[]
                        }
            
                        discussionRoomServ.insert(room)
                            .then(room=>{
                                room_id = room._id
                                this.socketMessages(socket, io)
                            })
                    }else{
                        this.socketMessages(socket, io)
                    }

                })

            

            
         
           
        })

        this.userLeave = this.userLeave.bind(this)
        this.userjoin = this.userjoin.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.getTopicUsers = this.getTopicUsers.bind(this)
    }

    socketMessages (socket, io){

        socket.once("joinroom", ({username, topic, id})=>{

            messageServ.getAll()
                .then(all=>{

                all.forEach(element=>{
                    console.log(element)
                    socket.emit("message", formatMessage(element._id, element.like, element.report,element.username, element.content, element.date))
                })
            })

            discussionRoomServ.getAll()
                .then(room=>{

                         if(!room[0].usernames.includes(username)){

                            room[0].usernames.push(username)
                        }
                        if(!room[0].users.includes(id)){

                            room[0].users.push(id)
                        } 
                        room[0].topic = topic
                    discussionRoomServ.updateOne(room[0]._id, room[0])
                        .then(updatedroom=>{
                            console.log(updatedroom)

                            var joinedOne = {username, topic, id}
                
                            joinedOne[socket.id] = joinedOne.id
                            const user = this.userjoin(socket.id, username, topic, id)
                            socket.join(user.topic)
                            
                                
                                console.log(joinedOne.username)
                                socket.emit("message", formatMessage("Yeneta",0,0 ,botName, "Welcome to Yeneta Discussion Room"))
                                socket.emit("message", formatMessage("Yeneta",0,0 ,botName, `A ${joinedOne.username} has joined the chat`))
                                
                
                
                            io.to(user.topic).emit("TopicUsers",{
                                topic:user.topic,
                                users:this.getTopicUsers()
                            })
                            
                            
                            
                        })
                })
           


            });

        
        socket.on("disconnect", ()=>{


            const user = this.userLeave(socket.id)
            if(user){
                io.emit("message", formatMessage("Yeneta",0,0 ,botName,`A ${user.username} has left the chat`))
            
                io.to(user.topic).emit("TopicUsers",{
                    topic:user.topic,
                    users:this.getTopicUsers()
                })
            }

        })
    
        socket.on("chatMessage", msg=>{

            const user = this.getCurrentUser(socket.id)
            console.log(user)

            const insertedmsg = {
                content:msg, 
                like:0,
                report:0,
                username: user.username,
                user:user.id,
                date:moment().format('h:mm a')
            }
            messageServ.insert(insertedmsg)
                .then(msg=>{
                    io.emit("chatMessage", formatMessage(msg.id, msg.like, msg.report, msg.username, msg.content, msg.date))
            
                })
        })

        socket.on("likedMessage", ({id})=>{
            console.log(id)

            messageServ.getOneAndUpdateLike(id)
                .then(msg=>{
                    const like = msg.like+1
                    io.emit("likedMessage", {like})

                })
           

        })

        socket.on("reportedMessage", ({id})=>{
            console.log(id)

            var leave = false

            messageServ.getOneAndUpdateReport(id)
                .then(msg=>{
                    const report = msg.report+1
                    if(report>=3){
                        leave = true
                        io.emit("reportedMessage", {report, leave})
                    }else{
                    io.emit("reportedMessage", {report, leave})
                    }
                })
           

        })

    }

    userjoin(socket_id, username, topic, id){

        const user = {socket_id, username, topic, id}

        users.push(user)
        return users
                      
       
      
    
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