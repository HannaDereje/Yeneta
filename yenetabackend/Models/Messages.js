const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    content: {
         type: String, 
         required: true 
        },
    date: {
         type: String
        },
    like:{
        type: Number,
        default:0
    },
    report:{
        type: Number,
        default:0 
    },
    username:{
        type:String
    },
    user: {
         type: Schema.Types.ObjectId,
         ref:"UserClass" 
       }
}, {
        timestamps: true
    })

class Message {

    constructor(content, date, like, report, user, username) {
        this.content = content;
        this.date = date;
        this.user = user;
        this.like = like;
        this.report = report
        this.username = username
    }

}


MessageSchema.loadClass(Message)


module.exports = mongoose.models.MessageClass || mongoose.model('MessageClass', MessageSchema)