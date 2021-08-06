const mongoose = require("mongoose");

class QuizAnswerRepository {

    constructor(model) {
        this.model = model;
    }

    create(quizAnswer) {
        return new Promise((resolve, reject) => {
            this.model(quizAnswer).save();
            resolve(quizAnswer);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const quizAnswers = this.model.find({});
            resolve(quizAnswers)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuizAnswer = this.model.findById({ _id: id })
            resolve(oneQuizAnswer)
        });
    }
    getByQuiz(id) {
        return new Promise((resolve, reject) => {
            const oneQuizAnswer = this.model.findOne({ quiz: id })
            resolve(oneQuizAnswer)
        });
    }
    updateOne(id, quizAnswer) {
        let set = {};
        for (const key in quizAnswer) {
            set[key] = quizAnswer[key];

        }
        return new Promise((resolve, reject) => {
            const oneQuizAnswer = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneQuizAnswer)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuizAnswer1 = this.model.remove({ _id: id })
            resolve(oneQuizAnswer1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allQuizAnswers = this.model.remove()
            resolve(allQuizAnswers)
        });
    }

}

module.exports = QuizAnswerRepository;