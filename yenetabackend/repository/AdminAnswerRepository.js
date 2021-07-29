const mongoose = require("mongoose");

class AdminAnswerRepository {

    constructor(model) {
        this.model = model;
    }

    create(adminAnswer) {
        return new Promise((resolve, reject) => {
            this.model(adminAnswer).save();
            resolve(adminAnswer);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const adminAnswers = this.model.find({});
            resolve(adminAnswers)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const aneAdminAnswer = this.model.findById(id)
            resolve(oneAdminAnswer)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneAdminAnswer1 = this.model.remove(id)
            resolve(oneAdminAnswer1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allAdminAnswers = this.model.remove()
            resolve(allAdminAnswers)
        });
    }

}

module.exports = AdminAnswerRepository;