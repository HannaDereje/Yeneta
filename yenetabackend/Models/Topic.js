const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({

    topic: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    })

class Topic {

    constructor(topic) {
        this.topic = topic;

    }

}


TopicSchema.loadClass(Topic)

module.exports = mongoose.models.Topic || mongoose.model('TopicClass', TopicSchema)