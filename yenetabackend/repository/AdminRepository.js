const mongoose = require("mongoose");

class AdminRepository {

    constructor(model) {
        this.model = model;
    }

    create(admin) {
        return new Promise((resolve, reject) => {
            resolve(this.model(admin).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const admins = this.model.find({});
            resolve(admins)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneadmin = this.model.findById({ _id: id })
            resolve(oneadmin)
        });
    }
    updateOne(id, admin) {
        let set = {};
        for (const key in admin) {
            set[key] = admin[key];

        }
        return new Promise((resolve, reject) => {
            const admin = this.model.updateOne({ _id: id }, { $set: set })
            resolve(admin)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneadmin1 = this.model.remove({ _id: id })
            resolve(oneadmin1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const alladmins = this.model.remove()
            resolve(alladmins)
        });
    }

}

module.exports = AdminRepository;