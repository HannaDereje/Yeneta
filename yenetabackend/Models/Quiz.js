const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuizSchema = new Schema
({
    number:{type:Number},
    date: { type: Date},
    level: { type: String},
    allowedTime:{type:Number},
    questions:[{
        type : Schema.Types.ObjectId,
        ref:"QuestionClass"
    }],
    approved: { type: Boolean, default: false },
    user: { 
        type : Schema.Types.ObjectId,
        ref:"UserClass" ,
        required:true
    },
    questionNumber:{
        type:Number
    }
}, 
 {
        timestamps: true
    })

class Quiz {
    constructor(number, date, level, allowedTime, questions, approved, user, questionNumber) {
        this.date = date;
        this.level = level;
        this.allowedTime = allowedTime;
        this.questions = questions;
        this.number = number
        this.approved = approved
        this.user= user
        this.questionNumber = questionNumber
    }
}

QuizSchema.loadClass(Quiz)
QuizSchema.pre('save', function(next) {
    if (!this.start_time) this.start_time = new Date;
    next();
  });

module.exports = mongoose.models.QuizClass || mongoose.model('QuizClass', QuizSchema)