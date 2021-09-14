const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentManagerSchema = new Schema({

    name: { 
        type: String, 
        required: true 
    },
    email:
     {     
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    experience:{
        type: String, 
        required: true
    },
    job:{
        type: String, 
        required: true
    },
user: {  
        type : Schema.Types.ObjectId, 
        ref:"UserClass" , 
        require:true 
    }
}, {
        timestamps: true
    })

class ContentManager {

    constructor(name, email, experience, job, user) {
        this.name = name;
        this.email = email;
        this.experience = experience;
        this.job = job;
        this.user = user;
    }

}


ContentManagerSchema.loadClass(ContentManager)


module.exports =  mongoose.models.ContentManagerClass || mongoose.model('ContentManagerClass', ContentManagerSchema)