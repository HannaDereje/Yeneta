const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentQuestionSchema = new Schema({

    userquestion: {
         type: String,
          required: true 
        },
    user: {
        type : Schema.Types.ObjectId,
        ref:"UserClass",
        required:true
        }
    
}, {
        timestamps: true
    })

class StudentQuestion {

    constructor(userquestion, user) {
        this.userquestion = userquestion;
        this.user = user;

    }

}


StudentQuestionSchema.loadClass(StudentQuestion)

module.exports = mongoose.model('StudentQuestionClass', StudentQuestionSchema)