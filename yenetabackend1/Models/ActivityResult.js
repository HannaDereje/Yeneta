const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityResultSchema = new Schema({

    result: {
         type: Number,
          required: true 
        },
    user: {
        type : Schema.Types.ObjectId,
        ref:"UserClass"
        },
    activity: { 
        type : Schema.Types.ObjectId,
        ref:"ActivityClass"
    }
}, {
        timestamps: true
    })

class ActivityResult {

    constructor(result, user, activity) {
        this.result = result;
        this.user = user;
        this.activity = activity;

    }

}


ActivityResultSchema.loadClass(ActivityResult)

module.exports = mongoose.model('ActivityResultClass', ActivityResultSchema)