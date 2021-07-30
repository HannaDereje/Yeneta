const mongoose = require("mongoose");

class Topic {

    constructor(model) {
        this.model = model;
    }

    create(topic) {
        return new Promise((resolve, reject) => {
            this.model(topic).save();
            resolve(topic);
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const topic = this.model.find({});
            resolve(topic)
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            const oneTopic = this.model.findOne({ _id: id })
            resolve(oneTopic)
        });
    }
    updateOne(id, topic) {
        let set = {};
        for (const key in topic) {
            set[key] = topic[key];

        }
        return new Promise((resolve, reject) => {
            const oneTopic = this.model.updateOne({ _id: id }, { $set: set })
            resolve(oneTopic)
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            const oneTopic = this.model.deleteOne({ _id: id })
            resolve(oneTopic)
        });
    }
    deleteAll() {
        return new Promise((resolve, reject) => {
            const allTopics = this.model.remove()
            resolve(allTopics)
        });
    }

}

module.exports = TopicRepository;