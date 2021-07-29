const mongoose = require("mongoose");

class ActivityRepository {

    constructor(model) {
        this.model = model;
    }

    create(activity) {
        return new Promise((resolve, reject) => {
            this.model(activity).save();
            resolve(activity);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const activities = this.model.find({});
            resolve(activities)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivity = this.model.findById(id)
            resolve(oneActivity)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivity1 = this.model.remove(id)
            resolve(oneActivity1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allActivities = this.model.remove()
            resolve(allActivities)
        });
    }

}

module.exports = ActivityRepository;