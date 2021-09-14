const mongoose = require("mongoose");

class MessageRepository {

    constructor(model) {
        this.model = model;
    }

    create(message) {
        return new Promise((resolve, reject) => {
            resolve(this.model(message).save());
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const messages = this.model.find({});
            resolve(messages)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneMessage = this.model.findById({ _id: id })
            resolve(oneMessage)
        });
    }

    getOneAndUpdateLike(id){
     
        return new Promise((resolve, reject) => {
            const oneMessage = this.model.findOneAndUpdate({ _id: id }, { $inc:{like:1}})
            resolve(oneMessage)
        });
    }

    getOneAndUpdateReport(id){
     
        return new Promise((resolve, reject) => {
            const oneMessage = this.model.findOneAndUpdate({ _id: id }, { $inc:{report:1}})
            resolve(oneMessage)
        });
    }

    updateOne(id, message) {
        let set = {};
        for (const key in message) {
            set[key] = message[key];

        }
        return new Promise((resolve, reject) => {
            const oneMessage = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneMessage)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneMessage1 = this.model.remove({ _id: id })
            resolve(oneMessage1)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allMessages = this.model.remove()
            resolve(allMessages)
        });
    }

}

module.exports = MessageRepository;