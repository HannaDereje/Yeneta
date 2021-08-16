const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    content: { type: String, required: true },
    type: { type: String, required: true },
    answer: { type: String, required: true }
}, {
        timestamps: true
    })

class Question {

    constructor(content, type, answer) {
        this.content = content;
        this.answer = answer;
        this.type = type;
    }

}


QuestionSchema.loadClass(Question)

module.exports = mongoose.models.Question || mongoose.model('QuestionClass', QuestionSchema)