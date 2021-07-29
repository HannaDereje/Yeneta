const mongoose = require("mongoose");

class RoleRepository {

    constructor(model) {
        this.model = model;
    }

    create(role) {
        return new Promise((resolve, reject) => {
            this.model(role).save();
            resolve(role);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const roles = this.model.find({});
            resolve(roles)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneRole = this.model.findById(id)
            resolve(oneRole)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneRole1 = this.model.remove(id)
            resolve(oneRole1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allRoles = this.model.remove()
            resolve(allRoles)
        });
    }

}

module.exports = RoleRepository;