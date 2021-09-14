const mongoose = require("mongoose");

class QuizRepository {

    constructor(model) {
        this.model = model;
    }

    create(quiz) {
        return new Promise((resolve, reject) => {
            resolve(this.model(quiz).save());
        });
    }

    getCount(){

        return new Promise((resolve, reject)=>{        
            const count = this.model.count();
            resolve(count)}); 
    }

    getOneByUser(user){ 
        return new Promise((resolve, reject)=>{ 
            const aquiz = this.model.find({user:user}) 
            resolve(aquiz) 
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
            const oneQuiz = this.model.findById({ _id: id })
            resolve(oneQuiz)
        });
    }
    updateOne(id, quiz) {
        let set = {};
        for (const key in quiz) {
            set[key] = quiz[key];

        }
        return new Promise((resolve, reject) => {
            const oneQuiz = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneQuiz)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneQuiz1 = this.model.remove({ _id: id })
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