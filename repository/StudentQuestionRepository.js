const mongoose = require("mongoose");

class StudentQuestionRepository {

    constructor(model) {
        this.model = model;
    }

    create(studentQuestion) {
        return new Promise((resolve, reject) => {
            resolve(this.model(studentQuestion).save());
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
            const oneStudentQuestion = this.model.findById({ _id: id })
            resolve(oneStudentQuestion)
        });
    }
    updateOne(id, studentQuestion) {
        let set = {};
        for (const key in studentQuestion) {
            set[key] = studentQuestion[key];

        }
        return new Promise((resolve, reject) => {
            const oneStudentQuestion = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneStudentQuestion)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneStudentQuestion1 = this.model.remove({ _id: id })
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