const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionRoomSchema = new Schema({

    topic: { 
        type : String,
    },
    start_time: { 
        type: String
    },
    expire_time: { 
        type: String
    },
    status: { 
        type: String, 
        required: true 
    },
    usernames:[{
        type : String
    }],
    users:[{
        type : Schema.Types.ObjectId,
        ref:"UserClass"
    }]
}, {
        timestamps: true
    })

class DiscussionRoom {

    constructor(topic, start_time, expire_time, status, students, messages) {
        this.topic = topic;
        this.start_time = start_time;
        this.expire_time = expire_time;
        this.status = status;
        this.students = students;
        this.messages = messages;
    }

}


DiscussionRoomSchema.loadClass(DiscussionRoom)


module.exports = mongoose.models.DiscussionRoomClass || mongoose.model('DiscussionRoomClass', DiscussionRoomSchema)