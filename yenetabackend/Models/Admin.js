const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserClass",
        require: true
    }

}, {
        timestamps: true
    })


class Admin {

    constructor(name, email, user) {
        this.name = name;
        this.email = email;
        this.user = user;

    }

}


AdminSchema.loadClass(Admin)

module.exports = mongoose.models.Admin || mongoose.model('AdminClass', AdminSchema)