const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuizResultSchema = new Schema
    ({
        result: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserClass",
            required: true
        },
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "QuizClass",
            required: true
        }
    },
    {
        timestamps: true
    })
class QuizResult {
    constructor(result, user, quiz) {
        this.result = result;
        this.user = user;
        this.quiz = quiz;
    }
}

QuizResultSchema.loadClass(QuizResult)
module.exports = mongoose.models.QuizResult || mongoose.model('QuizResultClass', QuizResultSchema)