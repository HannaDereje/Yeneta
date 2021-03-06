const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuizSchema = new Schema
    ({
        date: { type: Date, required: true },
        level: { type: String, required: true },
        start_time: { type: Date, required: true },
        finish_time: { type: Date, required: true },
        approved: {
            type: Boolean,
            default: false
        },
        questions: [{
            type: Schema.Types.ObjectId,
            ref: "QuestionClass"
        }],
    },
    {
        timestamps: true
    })

class Quiz {
    constructor(date, level, start_time, finish_time, approved, questions) {
        this.date = date;
        this.level = level;
        this.start_time = start_time;
        this.finish_time = finish_time;
        this.questions = questions;
        this.approved = approved;
    }
}

QuizSchema.loadClass(Quiz)
QuizSchema.pre('save', function (next) {
    if (!this.start_time) this.start_time = new Date;
    next();
});

module.exports = mongoose.models.Quiz || mongoose.model('QuizClass', QuizSchema)