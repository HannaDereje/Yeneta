const mongoose = require("mongoose");

class QuestionRepository {

    constructor(model) {
        this.model = model;
    }

    create(question) {
        return new Promise((resolve, reject) => {
            this.model(question).save();
            resolve(question);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const questions = this.model.find({});
            resolve(questions)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuestion = this.model.findById(id)
            resolve(oneQuestion)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuestion1 = this.model.remove(id)
            resolve(oneQuestion1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allQuestions = this.model.remove()
            resolve(allQuestions)
        });
    }

}

module.exports = QuestionRepository;