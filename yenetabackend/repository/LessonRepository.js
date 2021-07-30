const mongoose = require("mongoose");

class LessonRepository {

    constructor(model) {
        this.model = model;
    }

    create(lesson) {
        return new Promise((resolve, reject) => {
            this.model(lesson).save();
            resolve(lesson);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const lessons = this.model.find({});
            resolve(lessons)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const alesson = this.model.findById({ _id: id })
            resolve(alesson)
        });
    }
    updateOne(id, lesson) {
        let set = {};
        for (const key in lesson) {
            set[key] = lesson[key];

        }
        return new Promise((resolve, reject) => {
            const alesson = this.model.updateOne({ _id: id }, { $set: set })
            resolve(alesson)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const alesson = this.model.remove({ _id: id })
            resolve(alesson)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const alllesson = this.model.remove()
            resolve(alllesson)
        });
    }

}

module.exports = LessonRepository;