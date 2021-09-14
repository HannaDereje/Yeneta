const mongoose = require("mongoose");

class LessonRepository {

    constructor(model) {
        this.model = model;
    }

    create(lesson) {
        return new Promise((resolve, reject) => {
            resolve(this.model(lesson).save());
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
getOneByUser(user){ 
        return new Promise((resolve, reject)=>{ 
            const alesson = this.model.find({user:user}) 
            resolve(alesson) 
        }); 
    }

    getOneByLevel(level){ 
        return new Promise((resolve, reject)=>{ 
            const lessons = this.model.findOne({level:level}) 
            resolve(lessons) 
        }); 
    }

    getCount(){

        return new Promise((resolve, reject)=>{        
            const count = this.model.count();
            resolve(count)}); 
    }

    updateOne(id, lesson) {
        let set = {};
        for (const key in lesson) {
            set[key] = lesson[key];

        }
        return new Promise((resolve, reject) => {
            resolve(this.model.updateOne({ _id: id }, { $set: set }))
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