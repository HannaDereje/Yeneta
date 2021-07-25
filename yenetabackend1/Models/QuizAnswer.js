const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizAnswerSchema = new Schema({

    useranswer: {
         type: String,
          required: true 
        },
    user: {
        type : Schema.Types.ObjectId,
        ref:"UserClass",
        required:true
        },
    quiz: { 
        type : Schema.Types.ObjectId,
        ref:"QuizClass",
        required:true
    }
}, {
        timestamps: true
    })

class QuizAnswer {

    constructor(useranswer, user, quiz) {
        this.useranswer = useranswer;
        this.user = user;
        this.quiz = quiz;

    }

}


QuizAnswerSchema.loadClass(QuizAnswer)

module.exports = mongoose.model('QuizAnswerClass', QuizAnswerSchema)