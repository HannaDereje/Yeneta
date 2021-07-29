const mongoose = require("mongoose");

class QuizResultRepository {

    constructor(model) {
        this.model = model;
    }

    create(quizResult) {
        return new Promise((resolve, reject) => {
            this.model(quizResult).save();
            resolve(quizResult);
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
            const oneQuizResult = this.model.findById(id)
            resolve(oneQuizResult)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuizResult1 = this.model.remove(id)
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