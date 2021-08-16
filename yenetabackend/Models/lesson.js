const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({

    number: {
        type: Number,
        //unique: true,
        //required: true
    },
    /*topic: {
        type: String,
        required: true
    },*/
    note: {
        type: String,
        //required: true
    },
    level: {
        type: String,
        //required: true
    },
    image: {
        type: String
    },
    imageDescription: {
        type: String
    },
    audio: {
        type: String
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
        ref: "ActivityClass"
    }
}, {
        timestamps: true
    })

class Lesson {

    constructor(number, note, level, image, imageDescription, audio, videoLink) {
        this.number = number;
        //this.topic = topic;
        this.note = note;
        this.level = level;
        this.image = image;
        this.imageDescription = this.imageDescription;
        this.audio = audio;
        this.videoLink = videoLink;
        //this.activity = activity;
    }

}


LessonSchema.loadClass(Lesson)

module.exports = mongoose.models.LessonClass || mongoose.model('LessonClass', LessonSchema)