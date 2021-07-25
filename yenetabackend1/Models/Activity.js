const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
    level: { type: String, required: true },
    due_date: { type: Date, required: true },
    questions:[{
        type : Schema.Types.ObjectId,
        ref:"QuestionClass"
    }],

}, {
        timestamps: true
    })
class Activity {
    constructor(level, due_date, questions) {
        this.level = level
        this.due_date = due_date
        this.questions = questions
    }
}
ActivitySchema.loadClass(Activity)
module.exports = mongoose.model('ActivityClass', ActivitySchema)