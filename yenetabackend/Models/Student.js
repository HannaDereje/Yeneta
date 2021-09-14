const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({

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
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
    age: { 
        type: Number, 
        required: true,
        max:18
     },
    country: { 
        type: String,
         required: true 
    },
    image: { 
         type: String,
         required: true 
    },
    level: { 
        type: String, 
        required: true , 
        enum: ['BEGINEER', 'INTERMEDIATE', "ADVANCED"],
        default:"BEGINEER"
    },
    approved:{
        type:Boolean,
        default:false 
    },
    user: { 
        type : Schema.Types.ObjectId,
        ref:"UserClass" ,
        required:true
    },
    lessons:[{
        type:String,
        required:true
    }],
quizes:[{ 
        type:String,
        required:true
    }]
}, {
        timestamps: true
    })

class Student {

    constructor(name, email, age, country, image, level, approved, user, lessons, quizes) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.country = country;
        this.image = image;
        this.level = level;
        this.user = user;
        this.lessons = lessons;
        this.quizes = quizes
        this.approved = approved
    }

}


StudentSchema.loadClass(Student)


module.exports = mongoose.models.StudentClass || mongoose.model('StudentClass', StudentSchema)