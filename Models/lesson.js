const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({

    number: {
        type: Number,
        unique: true,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },

    videoLink: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: "ActivityClass",
        required: true
    },user: { 
        type : Schema.Types.ObjectId,
        ref:"UserClass" ,
        required:true
    }
}, {
        timestamps: true
    })

class Lesson {

    constructor(number, topic, note, level, videoLink,approved, activity, user) {
        this.number = number;
        this.topic = topic;
        this.note = note;
        this.level = level;
        this.videoLink = videoLink;
        this.activity = activity;
        this.approved = approved
        this.user = user
    }

}


LessonSchema.loadClass(Lesson)

module.exports = mongoose.models.LessonClass || mongoose.model('LessonClass', LessonSchema)