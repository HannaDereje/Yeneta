const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentManagerAnswerSchema = new Schema({

    answer: { 
        type: String,
         required: true 
        },
    date: { 
        type: Date,
        required: true },

    question:{
        type : Schema.Types.ObjectId,
        ref:"StudentQuestionClass"
    },
    user: { 
        type : Schema.Types.ObjectId,
        ref:"UserClass"
    }
}, {
        timestamps: true
    })

class ContentManagerAnswer {

    constructor(answer, date, question, user) {
        this.answer = answer;
        this.date = date;
        this.user = user;
        this.question = question

    }

}


ContentManagerAnswerSchema.loadClass(ContentManagerAnswer)
ContentManagerAnswerSchema.pre('save', function(next) {
    if (!this.date) this.start_time = new Date;
    next();
  });


module.exports = mongoose.models.ContentManagerAnswerClass || mongoose.model('ContentManagerAnswerClass', ContentManagerAnswerSchema)