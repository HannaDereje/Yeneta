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
            const alesson = this.model.findById(id)
            resolve(alesson)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const alesson = this.model.remove(id)
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