const mongoose = require("mongoose");

class RoleRepository {

    constructor(model) {
        this.model = model;
    }

    create(role) {
        return new Promise((resolve, reject) => {
            resolve(this.model(role).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const roles = this.model.find({});
            resolve(roles)
        });
    }

    getOneById(id){
        return new Promise((resolve, reject)=>{
            const arole = this.model.findById({_id:id})
            resolve(arole)
        });
        
    }
    getOne(role){
        return new Promise((resolve, reject)=>{
            const arole = this.model.findOne({role:role})
            resolve(arole)
        });
    }
    updateOne(id, role) {
        let set = {};
        for (const key in role) {
            set[key] = role[key];

        }
        return new Promise((resolve, reject) => {
            const oneRole = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneRole)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneRole1 = this.model.remove({ _id: id })
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