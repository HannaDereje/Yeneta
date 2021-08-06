const mongoose = require("mongoose");

class StudentRepository {

    constructor(model) {
        this.model = model;
    }

    create(student) {
        return new Promise((resolve, reject) => {
            this.model(student).save();
            resolve(student);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const student = this.model.find({});
            resolve(student)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneStudent = this.model.findOne({ _id: id })
            resolve(oneStudent)
        });
    }
getOneByEmail(email){ 
        return new Promise((resolve, reject)=>{ 
            const auser = this.model.findOne({email:email}) 
            resolve(auser) 
        }); 
    }
    updateOne(id, student) {
        let set = {};
        for (const key in student) {
            set[key] = student[key];

        }
        return new Promise((resolve, reject) => {
            const oneStudent = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneStudent)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneStudent = this.model.deleteOne({ _id: id })
            resolve(oneStudent)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allStudents = this.model.remove()
            resolve(allStudents)
        });
    }

}

module.exports = StudentRepository;