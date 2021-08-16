const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserClass",
        required: true
    }
}, {
        timestamps: true
    })

class Message {

    constructor(content, date, user) {
        this.content = content;
        this.date = date;
        this.user = user;
    }

}


MessageSchema.loadClass(Message)

module.exports = mongoose.models.Message || mongoose.model('MessageClass', MessageSchema)