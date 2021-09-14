const mongoose = require("mongoose");

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    create(user) {
        return new Promise((resolve, reject) => {
            resolve(this.model(user).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const user = this.model.find({});
            resolve(user)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneUser = this.model.findOne({ _id: id })
            resolve(oneUser)
        });
    }

    getOneUsername(username) {
        return new Promise((resolve, reject) => {
            const oneUser = this.model.findOne({ username: username })
            resolve(oneUser)
        });
    }
getOneByEmail(email){ 
        return new Promise((resolve, reject)=>{ 
            const oneuser = this.model.findOne({email:email}) 
            resolve(oneuser) 
        }); 
    } 

    getMany(emails) {
        return new Promise((resolve, reject) => {
            resolve(this.model.find({email:{$in:emails}}));
        });
    }
 
    getOneByToken(token){ 
        return new Promise((resolve, reject)=>{ 
            const oneuser = this.model.findOne({accessToken:token}) 
            resolve(oneuser) 
        }); 
    }
    updateOne(id, user) {
        let set = {};
        for (const key in user) {
            set[key] = user[key];

        }
        return new Promise((resolve, reject) => {
            const oneUser = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneUser)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneUser = this.model.deleteOne({ _id: id })
            resolve(oneUser)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allUsers = this.model.remove()
            resolve(allUsers)
        });
    }

}

module.exports = UserRepository;