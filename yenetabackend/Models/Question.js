const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    content: { type: String, required: true },
    level :{type:String},
    answer: { type: String, required: true }
}, {
        timestamps: true
    })

class Question {

    constructor(content, level, answer) {
        this.content = content;
        this.answer = answer;
        this.level = level;
    }

}


QuestionSchema.loadClass(Question)

module.exports = mongoose.model('QuestionClass', QuestionSchema)