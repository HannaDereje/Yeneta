const mongoose = require("mongoose");

class ActivityResultRepository {

    constructor(model) {
        this.model = model;
    }

    create(activityResult) {
        return new Promise((resolve, reject) => {
            resolve(this.model(activityResult).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const activityResults = this.model.find({});
            resolve(activityResults)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivityResult = this.model.findById({ _id: id })
            resolve(OneActivityResult)
        });
    }
    updateOne(id, activityResult) {
        let set = {};
        for (const key in activityResult) {
            set[key] = activityResult[key];

        }
        return new Promise((resolve, reject) => {
            const oneActivityResult = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneActivityResult)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivityResult1 = this.model.remove({ _id: id })
            resolve(OneActivityResult1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allActivityResults = this.model.remove()
            resolve(allActivityResults)
        });
    }

}

module.exports = ActivityResultRepository;