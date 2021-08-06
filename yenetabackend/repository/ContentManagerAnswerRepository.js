const mongoose = require("mongoose");

class ContentManagerAnswerRepository {

    constructor(model) {
        this.model = model;
    }

    create(contentmanagerAnswer) {
        return new Promise((resolve, reject) => {
            this.model(contentmanagerAnswer).save();
            resolve(contentmanagerAnswer);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const contentmanagerAnswers = this.model.find({});
            resolve(contentmanagerAnswers)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const onecontentmanagerAnswerAnswer = this.model.findById({ _id: id })
            resolve(onecontentmanagerAnswerAnswer)
        });
    }
    updateOne(id, contentmanagerAnswer) {
        let set = {};
        for (const key in contentmanagerAnswer) {
            set[key] = contentmanagerAnswer[key];

        }
        return new Promise((resolve, reject) => {
            const onecontentmanagerAnswer = this.model.updateOne({ _id: id }, { $set: set })
            resolve(onecontentmanagerAnswer)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const onecontentmanagerAnswer1 = this.model.remove({ _id: id })
            resolve(onecontentmanagerAnswer1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allcontentmanagerAnswers = this.model.remove()
            resolve(allcontentmanagerAnswers)
        });
    }

}

module.exports = ContentManagerAnswerRepository;