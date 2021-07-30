const mongoose = require("mongoose");

class MessageRepository {

    constructor(model) {
        this.model = model;
    }

    create(message) {
        return new Promise((resolve, reject) => {
            this.model(message).save();
            resolve(message);
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