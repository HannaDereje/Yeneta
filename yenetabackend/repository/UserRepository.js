const mongoose = require("mongoose");

class User {

    constructor(model) {
        this.model = model;
    }

    create(user) {
        return new Promise((resolve, reject) => {
            this.model(user).save();
            resolve(user);
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