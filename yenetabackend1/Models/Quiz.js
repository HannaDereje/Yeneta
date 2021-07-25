const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({

    date: { type: Date, required: true },
    level: { type: String, required: true },
    start_time: { type: Date, required: true },
    finish_time: { type: Date, required: true },
    questions:[{
        type : Schema.Types.ObjectId,
        ref:"QuestionClass"
    }],
}, {
        timestamps: true
    })

class Quiz {

    constructor(date, level, start_time, finish_time, questions) {
        this.date = date;
        this.level = level;
        this.start_time = start_time;
        this.finish_time = finish_time;
        this.questions = questions;
    }


}


QuizSchema.loadClass(Quiz)
QuizSchema.pre('save', function(next) {
    if (!this.start_time) this.start_time = new Date;
    next();
  });

module.exports = mongoose.model('QuizClass', QuizSchema)