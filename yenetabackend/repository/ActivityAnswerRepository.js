const mongoose = require("mongoose");

class ActivityAnswerRepository {

    constructor(model) {
        this.model = model;
    }

    create(activityAnswer) {
        return new Promise((resolve, reject) => {
            this.model(activityAnswer).save();
            resolve(activityAnswer);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const activityAnswers = this.model.find({});
            resolve(activityAnswers)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivityAnswer = this.model.findById(id)
            resolve(oneActivityAnswer)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneActivityAnswer1 = this.model.remove(id)
            resolve(oneActivityAnswer1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allActivityAnswers = this.model.remove()
            resolve(allActivityAnswers)
        });
    }

}

module.exports = ActivityAnswerRepository;