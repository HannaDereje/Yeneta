
class TopicService {

    constructor(topicRepository) {
        this.topicRepository = topicRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    insert(topic) {

        return this.topicRepository.create(topic)

    }
    getAll() {

        const topics = this.topicRepository.getAll();
        return new Promise((resolve, reject) => { resolve(topics) })
    }

    getOne(id) {

        const topic = this.topicRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(topic) })
    }

    updateOne(id, topic) {

        const topic2 = this.topicRepository.updateOne(id, topic);
        return new Promise((resolve, reject) => { resolve(topic2) })
    }
    deleteOne(id) {

        const deletedtopic = this.topicRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedtopic) })
    }
    deleteAll() {

        const deletedtopics = this.topicRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedtopics) })
    }

}

module.exports = TopicService
