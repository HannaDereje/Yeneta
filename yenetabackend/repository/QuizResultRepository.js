const mongoose = require("mongoose");

class QuizResultRepository {

    constructor(model) {
        this.model = model;
    }

    create(quizResult) {
        return new Promise((resolve, reject) => {
            resolve(this.model(quizResult).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const quizResults = this.model.find({});
            resolve(quizResults)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuizResult = this.model.findById({ _id: id })
            resolve(oneQuizResult)
        });
    }

    getOneByQuizId(id) {
        return new Promise((resolve, reject) => {
            const oneQuizResult = this.model.findOne({ quiz: id })
            resolve(oneQuizResult)
        });
    }
    
    updateOne(id, quizResult) {
        let set = {};
        for (const key in quizResult) {
            set[key] = quizResult[key];

        }
        return new Promise((resolve, reject) => {
            const oneQuizResult = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneQuizResult)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuizResult1 = this.model.remove({ _id: id })
            resolve(oneQuizResult1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allQuizResults = this.model.remove()
            resolve(allQuizResults)
        });
    }

}

module.exports = QuizResultRepository;