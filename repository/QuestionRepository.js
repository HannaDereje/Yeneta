const mongoose = require("mongoose");

class QuestionRepository {

    constructor(model) {
        this.model = model;
    }

    create(question) {
        return new Promise((resolve, reject) => {
            resolve(this.model(question).save());
        });
    }
    insertMany(questions) {
        return new Promise((resolve, reject) => {
            resolve(this.model.insertMany(questions));
        });
    }

    getRandom() {
        return new Promise((resolve, reject) => {
            resolve(this.model.aggregate([{$sample:{size:6}}]));
        });
    }
    getMany(ids) {
        return new Promise((resolve, reject) => {
            resolve(this.model.find({_id:{$in:ids}}));
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
            const oneQuestion = this.model.findById({ _id: id })
            resolve(oneQuestion)
        });
    }
    updateOne(id, question) {
        let set = {};
        for (const key in question) {
            set[key] = question[key];

        }
        return new Promise((resolve, reject) => {
            const oneQuestion = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneQuestion)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuestion1 = this.model.remove({ _id: id })
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