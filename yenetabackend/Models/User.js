const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    accessToken: {
        type: String

    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "RoleClass",
        required: true
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Active"]
    }

})

class User {

    constructor(username, password, email, accessToken, role, status) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.accessToken = accessToken;
        this.status = status;
    }

}
UserSchema.loadClass(User)


module.exports = mongoose.models.User || mongoose.model('UserClass', UserSchema)