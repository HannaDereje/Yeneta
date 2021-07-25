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
    user: { 
        type : Schema.Types.ObjectId,
        ref:"UserClass"
    }
}, {
        timestamps: true
    })

class ContentManagerAnswer {

    constructor(answer, date, user) {
        this.answer = answer;
        this.date = date;
        this.user = user;

    }

}


ContentManagerAnswerSchema.loadClass(ContentManagerAnswer)
ContentManagerAnswerSchema.pre('save', function(next) {
    if (!this.date) this.start_time = new Date;
    next();
  });


module.exports = mongoose.model('ContentManagerAnswerClass', ContentManagerAnswerSchema)