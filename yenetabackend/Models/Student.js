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
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
    age: {
        type: Number,
        required: true,
        max: 18
    },
    prefered_Date: {
        type: Date,
        required: true
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
        required: true,
        enum: ['BEGINEER', 'INTERMEDIATE', "ADVANCED"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserClass",
        required: true
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: "LessonClass",
        required: true
    }],
    quizes: [{
        type: Schema.Types.ObjectId,
        ref: "QuizClass"
    }]
}, {
        timestamps: true
    })

class Student {

    constructor(name, email, age, prefered_Date, country, image, level, user, lessons, quizes) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.prefered_Date = prefered_Date;
        this.country = country;
        this.image = image;
        this.level = level;
        this.user = user;
        this.lessons = lessons;
        this.quizes = quizes
    }

}


StudentSchema.loadClass(Student)


module.exports = mongoose.models.Student || mongoose.model('StudentClass', StudentSchema)