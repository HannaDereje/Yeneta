const mongoose = require("mongoose");

class QuizRepository {

    constructor(model) {
        this.model = model;
    }

    create(quiz) {
        return new Promise((resolve, reject) => {
            this.model(quiz).save();
            resolve(quiz);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const quizes = this.model.find({});
            resolve(quizes)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuiz = this.model.findById(id)
            resolve(oneQuiz)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuiz1 = this.model.remove(id)
            resolve(oneQuiz1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allQuizes = this.model.remove()
            resolve(allQuizes)
        });
    }

}

module.exports = QuizRepository;