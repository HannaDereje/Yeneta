const mongoose = require("mongoose");

class ContentManagerRepository {

    constructor(model) {
        this.model = model;
    }

    create(contentManager) {
        return new Promise((resolve, reject) => {
            resolve(this.model(contentManager).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const contentManager = this.model.find({});
            resolve(contentManager)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const onecontentManager = this.model.findOne({ _id: id })
            resolve(onecontentManager)
        });
    }
getOneByEmail(email){ 
        return new Promise((resolve, reject)=>{ 
            const acontentManager = this.model.findOne({email:email}) 
            resolve(acontentManager) 
        }); 
    }
    updateOne(id, contentManager) {
        let set = {};
        for (const key in contentManager) {
            set[key] = contentManager[key];

        }
        return new Promise((resolve, reject) => {
            const onecontentManager = this.model.updateOne({ _id: id }, { $set: set })
            resolve(onecontentManager)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const onecontentManager = this.model.deleteOne({ _id: id })
            resolve(onecontentManager)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allcontentManagers = this.model.remove()
            resolve(allcontentManagers)
        });
    }

}

module.exports = ContentManagerRepository;