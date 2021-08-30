const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    content: { type: String, required: true },
    answer: { type: String, required: true },
    level: { type: String, required: true }
}, {
        timestamps: true
    })

class Question {

    constructor(content, answer) {
        this.content = content;
        this.answer = answer;

    }

}


QuestionSchema.loadClass(Question)

module.exports = mongoose.models.QuestionClass || mongoose.model('QuestionClass', QuestionSchema)