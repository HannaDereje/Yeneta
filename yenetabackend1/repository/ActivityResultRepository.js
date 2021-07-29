const mongoose = require("mongoose");

class ActivityResultRepository {

    constructor(model) {
        this.model = model;
    }

    create(ActivityResult) {
        return new Promise((resolve, reject) => {
            this.model(activityResult).save();
            resolve(activityResult);
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
            const oneActivityResult = this.model.findById(id)
            resolve(OneActivityResult)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivityResult1 = this.model.remove(id)
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