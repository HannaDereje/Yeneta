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
            const oneActivity = this.model.findById({ _id: id })
            resolve(oneActivity)
        });
    }
    updateOne(id, activity) {
        let set = {};
        for (const key in activity) {
            set[key] = activity[key];

        }
        return new Promise((resolve, reject) => {
            const activity = this.model.updateOne({ _id: id }, { $set: set })
            resolve(activity)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivity1 = this.model.remove({ _id: id })
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