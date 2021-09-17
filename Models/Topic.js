const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({

    topic: { 
        type: String,
         required: true
         },
         user: { 
            type : Schema.Types.ObjectId,
            ref:"UserClass" ,
            required:true
        }
}, {
        timestamps: true
    })

class Topic {

    constructor(topic, user) {
        this.topic = topic;
        this.user= user
    }

}


TopicSchema.loadClass(Topic)

module.exports = mongoose.models.TopicClass || mongoose.model('TopicClass', TopicSchema)