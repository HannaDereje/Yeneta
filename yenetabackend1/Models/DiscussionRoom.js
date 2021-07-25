const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionRoomSchema = new Schema({

    topic: { 
        type : Schema.Types.ObjectId,
        ref:"TopicClass",
        required: true 
    },
    start_time: { 
        type: Date, 
        required: true 
    },
    expire_time: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        required: true 
    },
    users:[{
        type : Schema.Types.ObjectId,
        ref:"UserClass"
    }],
    messages:[{
        type : Schema.Types.ObjectId,
        ref:"MessageClass"
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
DiscussionRoomSchema.pre('save', function(next) {
    if (!this.start_time) this.start_time = new Date;
    next();
  });


module.exports = mongoose.model('DiscussionRoomClass', DiscussionRoomSchema)