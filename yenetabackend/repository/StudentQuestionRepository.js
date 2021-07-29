const mongoose = require("mongoose");

class StudentQuestionRepository {

    constructor(model) {
        this.model = model;
    }

    create(studentQuestion) {
        return new Promise((resolve, reject) => {
            this.model(studentQuestion).save();
            resolve(studentQuestion);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const studentQuestions = this.model.find({});
            resolve(studentQuestions)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneStudentQuestion = this.model.findById(id)
            resolve(oneStudentQuestion)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneStudentQuestion1 = this.model.remove(id)
            resolve(oneStudentQuestion1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allStudentQuestions = this.model.remove()
            resolve(allStudentQuestions)
        });
    }

}

module.exports = StudentQuestionRepository;