const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ActivityAnswerSchema = new Schema
({
    useranswer: {
         type: String,
          required: true 
        },
    user: {
        type : Schema.Types.ObjectId,
        ref:"UserClass"
        },
    activity: { 
        type : Schema.Types.ObjectId,
        ref:"ActivityClass"
    }
}, 
 {
        timestamps: true
    })

class ActivityAnswer {
    constructor(useranswer, user, activity) {
        this.useranswer = useranswer;
        this.user = user;
        this.activity = activity;
    }
}

ActivityAnswerSchema.loadClass(ActivityAnswer)
module.exports = mongoose.model('ActivityAnswerClass', ActivityAnswerSchema)