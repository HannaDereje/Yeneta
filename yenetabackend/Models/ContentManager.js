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
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    experience:{
        type: String, 
        required: true
    },
    job:{
        type: String, 
        required: true
    }
}, {
        timestamps: true
    })

class ContentManager {

    constructor(name, email, experience, job) {
        this.name = name;
        this.email = email;
        this.experience = experience;
        this.job = job;
    }

}


ContentManagerSchema.loadClass(ContentManager)


module.exports = mongoose.model('ContentManagerClass', ContentManagerSchema)