const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({

    role: { 
        type: String, 
        default:"STUDENT",
        enum : ["STUDENT", "TEACHER", "ADMIN"], 
        required: true 
    }

})

class Role{

    constructor(role){
        this.role =role;
    }

}
RoleSchema.loadClass(Role)


module.exports = mongoose.models.RoleClass || mongoose.model('RoleClass', RoleSchema)