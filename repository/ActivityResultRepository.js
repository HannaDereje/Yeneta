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
            const oneactivityResult = this.model.findById({ _id: id })
            resolve(oneactivityResult)
        });
    }

    getOneByactivityId(id) {
        return new Promise((resolve, reject) => {
            const oneactivityResult = this.model.findOne({ activity: id })
            resolve(oneactivityResult)
        });
    }
    
    updateOne(id, activityResult) {
        let set = {};
        for (const key in activityResult) {
            set[key] = activityResult[key];

        }
        return new Promise((resolve, reject) => {
            const oneactivityResult = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneactivityResult)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneactivityResult1 = this.model.remove({ _id: id })
            resolve(oneactivityResult1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allactivityResults = this.model.remove()
            resolve(allactivityResults)
        });
    }

}

module.exports = ActivityResultRepository;